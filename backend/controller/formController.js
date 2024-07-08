const Form = require('../model/form')

const contactForm  = async(req,res) => {
    
        const { name, email, contact, message } = req.body;
        const newContact = new Form({ name, email, contact, message });
        try {
            await newContact.save();
            res.status(200).send({ message: 'Form submitted successfully' });
          } catch (error) {
            res.status(500).send({ message: 'Failed to submit form', error });
            console.log(error)
          }
}

module.exports = contactForm;