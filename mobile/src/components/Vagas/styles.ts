import React, { useState, useCallback } from "react";
import { Container, FieldTime, Input, Text } from "./styles";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { IInputProps } from "native-base";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";

export type InputFieldProps = {
  titulo?: string;
  value?: any;
  children?: string;
  types?: "date" | "text" | "time" | "select";
  options?: { label: string; value: string }[];
  placeholder?: string;
  secureTextEntry?: boolean;
  onChangeText?: (value: string) => void;
  error?: string;
  required?: boolean;
} & IInputProps;

const InputField: React.FC<InputFieldProps> = ({
  titulo,
  placeholder,
  onChangeText,
  secureTextEntry,
  value,
  types = "text",
  options = [],
  error,
  required = false,
  ...rest
}) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [timeStringValue, setTimeStringValue] = useState("00:00");
  const [dataStringValue, setDataStringValue] = useState("DD/MM/YYYY");

  const formatDate = useCallback((date: Date): string => {
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }, []);

  const formatTime = useCallback((time: Date): string => {
    return time.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }, []);

  const handleDateChange = useCallback((event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (event.type === "set" && selectedDate) {
      const formattedDate = formatDate(selectedDate);
      setDataStringValue(formattedDate);
      onChangeText && onChangeText(formattedDate);
    }
  }, [onChangeText, formatDate]);

  const handleTimeChange = useCallback((event: DateTimePickerEvent, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (event.type === "set" && selectedTime) {
      const formattedTime = formatTime(selectedTime);
      setTimeStringValue(formattedTime);
      onChangeText && onChangeText(formattedTime);
    }
  }, [onChangeText, formatTime]);

  const renderInput = () => {
    switch (types) {
      case "text":
        return (
          <Container>
            <Text>{titulo}{required && <Text style={styles.requiredMarker}>*</Text>}</Text>
            <Input
              secureTextEntry={secureTextEntry}
              value={value}
              onChangeText={onChangeText}
              placeholder={placeholder}
              {...rest}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
          </Container>
        );

      case "date":
        return (
          <Container>
            <Text>{titulo}{required && <Text style={styles.requiredMarker}>*</Text>}</Text>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={styles.inputContainer}
            >
              {showDatePicker && (
                <DateTimePicker
                  value={new Date()}
                  mode="date"
                  display="inline"
                  onChange={handleDateChange}
                  {...rest}
                />
              )}
              <Text>{dataStringValue}</Text>
              <Feather name="calendar" size={24} color="gray" />
            </TouchableOpacity>
            {error && <Text style={styles.errorText}>{error}</Text>}
          </Container>
        );

      case "time":
        return (
          <FieldTime>
            <Text>{titulo}{required && <Text style={styles.requiredMarker}>*</Text>}</Text>
            <TouchableOpacity
              onPress={() => setShowTimePicker(true)}
              style={styles.inputContainer}
            >
              {showTimePicker && (
                <DateTimePicker
                  value={new Date()}
                  mode="time"
                  display="default"
                  locale="pt-BR"
                  onChange={handleTimeChange}
                  {...rest}
                />
              )}
              <Text>{timeStringValue}</Text>
              <Feather name="clock" size={24} color="gray" />
            </TouchableOpacity>
            {error && <Text style={styles.errorText}>{error}</Text>}
          </FieldTime>
        );

      case "select":
        return (
          <Container>
            <Text>{titulo}{required && <Text style={styles.requiredMarker}>*</Text>}</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={value || selectedValue}
                onValueChange={(itemValue) => {
                  setSelectedValue(itemValue);
                  onChangeText && onChangeText(itemValue);
                }}
                {...rest}
              >
                {options.map((option) => (
                  <Picker.Item
                    key={option.value}
                    label={option.label}
                    value={option.value}
                  />
                ))}
              </Picker>
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
          </Container>
        );
    }
  };

  return renderInput();
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 40,
    paddingHorizontal: 15,
    height: 50,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  pickerContainer: {
    borderRadius: 40,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  requiredMarker: {
    color: 'red',
    marginLeft: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 15,
  },
});

export default InputField;
