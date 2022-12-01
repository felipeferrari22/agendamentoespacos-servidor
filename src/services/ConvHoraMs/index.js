// @horaString: "HH:MM"
const ConvHoraMs = (horaString = "") => {
    const horas = parseInt(horaString.split(":")[0])
    const minutos = parseInt(horaString.split(":")[1])

    return (horas * 60 * 60 * 1000 + minutos * 60 * 1000)
}

module.exports = ConvHoraMs