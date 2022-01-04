// Get the form and message div
const form = document.getElementById('contact-form')
const formMessages = document.querySelector('.ajax-response')

// Add event listener

form.addEventListener('submit', handleSubmit)

function handleSubmit(e) {
  e.preventDefault()
  const name = document.getElementById('contact-name').value
  const email = document.getElementById('contact-email').value
  const subject = document.getElementById('contact-subject').value
  const message = document.getElementById('message').value

  if (name.length < 2) {
    return errorMsg('Remember to add a your name...')
  } else if (!validator.isEmail(email)) {
    return errorMsg('Check you email again ...')
  } else if (subject.length === 0) {
    return errorMsg('I\'m afraid a subject is needed...')
  } else if (message.length < 10) {
    return errorMsg('No message?')
  }

  const formData = {
    name,
    email,
    subject,
    message
  }

  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(formData)
  }

  fetch('https://formsubmit.co/ajax/juanjose.arcani2309@gmail.com', req)
    .then(res => res.json())
    .then(({ success, message }) => {


      if (success === 'false') {
        formMessages.classList.remove('success')
        formMessages.classList.add('error')
        formMessages.textContent = message
        return
      }
      return sendSuccess(message)
    })
    .catch(err => console.log('error:', err))
}

function errorMsg(message) {
  formMessages.classList.remove('success')
  formMessages.classList.add('error')
  formMessages.textContent = message
}

function sendSuccess(message) {
  formMessages.classList.remove('error')
  formMessages.classList.add('success')
  formMessages.textContent = message
  $('#contact-form input,#contact-form textarea').val('');
}
