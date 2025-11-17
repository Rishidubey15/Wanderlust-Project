// Set minimum dates for check-in and check-out
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('checkIn').min = today;
    document.getElementById('checkOut').min = today;
});

// Update check-out minimum date when check-in is selected
document.getElementById('checkIn').addEventListener('change', function() {
    document.getElementById('checkOut').min = this.value;
});

// Handle form submission
document.getElementById('bookingForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    try {
        const response = await fetch(this.action, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                checkIn: document.getElementById('checkIn').value,
                checkOut: document.getElementById('checkOut').value
            })
        });

        if (response.ok) {
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('bookingModal'));
            modal.hide();
            
            // Update button text
            const bookBtn = document.querySelector('.show-btns .edit-btn');
            bookBtn.textContent = 'Booking Confirmed';
            bookBtn.disabled = true;
            
        } else {
            throw new Error('Booking failed');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to process booking. Please try again.');
    }
});