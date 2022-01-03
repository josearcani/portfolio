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

  const formData = {
    name,
    email,
    subject,
    message
  }

  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/JSON'
    },
    body: JSON.stringify(formData)
  }

  fetch('/api/contact', req)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        formMessages.classList.remove('success')
        formMessages.classList.add('error')
        formMessages.textContent = data.error
        return
      }
      return sendSuccess(data)
    })
    .catch(err => console.log('error:', err))
}

function sendSuccess(message) {
  formMessages.classList.remove('error')
  formMessages.classList.add('success')
  formMessages.textContent = message
  $('#contact-form input,#contact-form textarea').val('');
}
