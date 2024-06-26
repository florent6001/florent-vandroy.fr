import axios from 'axios';
import { useState } from 'react'
import { useTranslation } from 'next-i18next';
import { BiMailSend, BiMapPin, BiPhone } from 'react-icons/bi';

export default function Contact() {
  const [formStatus, setFormStatus] = useState(false);
  const [query, setQuery] = useState({
    name: "",
    email: "",
    message: ""
  });
  const { t } = useTranslation();

  const handleChange = () => (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuery((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let button = document.getElementById('submit-btn')
    button.innerHTML = t('contact_sending_in_progress')
    button.disabled = true
    const formData = new FormData();
    Object.entries(query).forEach(([key, value]) => {
      formData.append(key, value);
    });

    axios
      .post(
        "https://getform.io/f/ca842a0d-f870-467b-8044-5280e396239f",
        formData,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      )
      .then(function (response) {
        setFormStatus(true);
        setQuery({
          name: "",
          email: "",
          message: ""
        });
        button.innerHTML = t('contact_send_message')
        button.disabled = false
      })
      .catch(function (error) {
        button.innerHTML = t('contact_send_message')
        button.disabled = false
      });
  }

  return (
    <>
      <h2>{t('contact_title')}</h2>
      <div className="flex flex-col lg:flex-row h-full mt-5">
        <div className="w-full pt-5 flex gap-10 flex-col h-full justify-between-content" data-aos="fade-right">
          <div className="flex">
            <i className="text-4xl pr-3"><BiPhone /></i>
            <p>
              <span className="font-bold text-xl">{t('contact_phone_number')}</span> <br />
              <span className="text-muted"><a href="tel:+33603000082" className="text-black dark:text-white">06 03 00 82 01</a></span>
            </p>
          </div>
          <div className="flex">
            <i className="text-4xl pr-3"><BiMailSend /></i>
            <p>
              <span className="font-bold text-xl">{t('contact_email_address')}</span> <br />
              <span className="text-muted"><a href="mailto:florentvandroy@gmail.com" className='text-black dark:text-white'>florentvandroy@gmail.com</a></span>
            </p>
          </div>
          <div className="flex">
            <i className="text-4xl pr-3"><BiMapPin /></i>
            <p>
              <span className="font-bold text-xl">{t('contact_location')}</span> <br />
              <span className="text-muted"><a href="https://www.google.com/maps/place/24100+Bergerac/data=!4m2!3m1!1s0x12aad07c6048f55f:0xd23474adfc552221?sa=X&ved=2ahUKEwiQyJ7luZaBAxXmRaQEHaOXCmkQ8gF6BAgPEAA&ved=2ahUKEwiQyJ7luZaBAxXmRaQEHaOXCmkQ8gF6BAgQEAI" className="text-black dark:text-white">Bergerac 24100</a></span>
            </p>
          </div>
        </div>
        <div className="w-full" data-aos="fade-up">
          <form
            acceptCharset="UTF-8"
            method="POST"
            id="ajaxForm"
            onSubmit={handleSubmit}
            className="pt-5"
            data-aos="fade-in"
          >
            <label htmlFor="name">{t('contact_fullname')}</label>
            <input
              type="text"
              className="border border-gray-800 w-full rounded p-2 mb-5 mt-2 text-black dark:text-white"
              id="name"
              required
              name="name"
              value={query.name}
              onChange={handleChange()}
            />
            <label htmlFor="email">{t('contact_email_address')}</label>
            <input
              type="email"
              className="border border-gray-800 w-full rounded p-2 mb-5 mt-2 text-black dark:text-white"
              id="email"
              required
              name="email"
              value={query.email}
              onChange={handleChange()}
            />
            <label htmlFor="message">{t('contact_message')}</label>
            <textarea
              className="border border-gray-800 w-full rounded p-2 mb-5 mt-2 text-black dark:text-white"
              id="message"
              required
              name="message"
              value={query.message}
              onChange={handleChange()}
              rows="5"></textarea>

            {formStatus ? (
              <div className="text-success mb-2">
                {t('contact_message_send_successfull')}
              </div>
            ) : (
              <button type="submit" className="btn btn-primary" id='submit-btn'>{t('contact_send_button')}</button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
