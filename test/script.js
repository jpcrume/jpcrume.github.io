document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the default form submission
    
    var email = document.getElementById('email').value;
    var feedback = document.getElementById('feedback').value;
  
    var data = {
      email: email,
      feedback: feedback
    };
  
    fetch('https://script.google.com/macros/s/AKfycbxjZs_MyCpXbhfOL3Y4o7V07_kmAwCWI7WK8ng_-7QIMCKk2Zk9M9W5b9HHhpsxIgDtcQ/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      alert('Thank you for your feedback!');
      document.getElementById('feedbackForm').reset(); // Reset form after submission
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Sorry, there was an error submitting your feedback.');
    });
  });
  