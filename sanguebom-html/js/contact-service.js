const apiUrl = 'http://127.0.0.1:5000';

async function createContact(name, birth_year, cellphone, email, message) {
    try {
        const response = await fetch(`${apiUrl}/create_contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                birth_year,
                cellphone,
                email,
                message
            }),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            alert(`Error: ${response.status} - ${errorMessage}`);
            throw new Error(`Error: ${response.status} - ${errorMessage}`);
        }

        const result = await response.json();
        if(result) {
            console.log(result);
            alert(`${result.message} - with ID ${result.contact_id}`)
        }
    } catch (error) {
        console.error('Error creating contact:', error.message);
    }
}

const handleData = () => {
    const name = document.getElementById('name').value
    const birth_year = document.getElementById('birth_year').value
    const cellphone = document.getElementById('cellphone').value
    const email = document.getElementById('email').value
    const message = document.getElementById('message').value

    createContact(name, birth_year, cellphone, email, message)
}
