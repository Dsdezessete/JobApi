export function gerarSenhaAleatoria(tamanho: number): string {
    if (tamanho < 4) {
        throw new Error("O tamanho mínimo da senha é 4 para garantir diversidade.");
    }

    const letrasMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const letrasMinusculas = "abcdefghijklmnopqrstuvwxyz";
    const numeros = "0123456789";
    const simbolos = "!@#$%^&*()_+[]{}|;:,.<>?";

    const senhaObrigatoria = [
        letrasMaiusculas.charAt(Math.floor(Math.random() * letrasMaiusculas.length)),
        letrasMinusculas.charAt(Math.floor(Math.random() * letrasMinusculas.length)),
        numeros.charAt(Math.floor(Math.random() * numeros.length)),
        simbolos.charAt(Math.floor(Math.random() * simbolos.length)),
    ];

    const todosCaracteres = letrasMaiusculas + letrasMinusculas + numeros + simbolos;

    while (senhaObrigatoria.length < tamanho) {
        const char = todosCaracteres.charAt(Math.floor(Math.random() * todosCaracteres.length));
        senhaObrigatoria.push(char);
    }

    return senhaObrigatoria.sort(() => Math.random() - 0.5).join('');
}
