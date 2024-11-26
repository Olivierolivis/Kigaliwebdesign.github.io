function sendEmail() {
    let parm = {
        names = document.getElementById("name").value,
        email = document.getElementById("email").value,
        subject = document.getElementById("subject").value,
        message = document.getElementById("message").value; 
    }
    emailjs.send("sevid","tempid",parm).then(alert("email sent"))
}