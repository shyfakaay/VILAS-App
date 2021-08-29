/**
 * Helper function for POSTing data as JSON with fetch.
 *
 * @param {Object} options
 * @param {string} options.url - URL to POST data to
 * @param {FormData} options.formData - `FormData` instance
 * @return {Object} - Response body from URL that was POSTed to
 */

async function postFormDataAsJson({ url, formData }) {
	const plainFormData = Object.fromEntries(formData.entries());
	const formDataJsonString = JSON.stringify(plainFormData);

	const fetchOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Accept":"application/json",
		},
		body: formDataJsonString,
	};

  fetch(url, fetchOptions).then(res => {
    res.json().then(response => {
      console.log({response})
      if (response) {
        window.location.href = "https://vilas-markoding01.markoding01.repl.co/7-Succes/suc.html";
      }
    })
  })
}


/**
 * Event handler for a form submit event.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event
 *
 * @param {SubmitEvent} event
 */
async function handleFormSubmit(event) {
	event.preventDefault();

	const form = event.currentTarget;
	const url = form.action;

	try {
		const formData = new FormData(form);
		const responseData = await postFormDataAsJson({ url, formData });

		console.log({ responseData });
	} catch (error) {
		console.error(error);
	}
}

const exampleForm = document.getElementById("example-form");
exampleForm.addEventListener("submit", handleFormSubmit);

// function getVerify() {
//   Window.open("https://vilas-markoding01.markoding01.repl.co/7-Succes/suc.html")
// }