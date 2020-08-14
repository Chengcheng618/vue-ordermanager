export let getnewtime = (newtime) => {
    let time=typeof newtime == "string" ? new Date(newtime) : newtime
    return time.getFullYear() +
        "-" +
        num(time.getMonth() + 1) +
        "-" +
        num(time.getDate()) +
        " " +
        num(time.getHours()) +
        ":" +
        num(time.getMinutes()) +
        ":" +
        num(time.getSeconds());
        
    function num(num) {
        return num < 10 ? "0" + num : num
    }
}