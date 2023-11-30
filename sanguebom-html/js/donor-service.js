const apiUrl = 'http://127.0.0.1:5000';

const createDonor = async (name, birth_year, cellphone, address, email, blood_type, weight, height) => {
    try {
        const response = await fetch(`${apiUrl}/create_donor`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                birth_year,
                cellphone,
                address,
                email,
                blood_type,
                weight,
                height
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
            alert(`${result.message} - with ID ${result.donor_id}`)
        }
    } catch (error) {
        console.error('Error creating donor:', error.message);
    }
}

const handleData = () => {
    const name = document.getElementById('name').value
    const birth_year = document.getElementById('birth_year').value
    const cellphone = document.getElementById('cellphone').value
    const address = document.getElementById('address').value
    const email = document.getElementById('email').value
    const blood_type = document.getElementById('blood_type').value
    const weight = document.getElementById('weight').value
    const height = document.getElementById('height').value

    createDonor(name, birth_year, cellphone, address, email, blood_type, weight, height)
}
