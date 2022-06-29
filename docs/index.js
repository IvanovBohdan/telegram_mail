window.onload = () => {
    const telegram = window.Telegram.WebApp;

    const div = document.getElementById("data");
    console.log(div);
    div.innerHTML = telegram.initData + "fuckoff";
};
