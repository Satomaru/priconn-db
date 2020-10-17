export class Ajax {

  constructor(url) {
    this.url = url;
    this.options = { method: 'GET' };
  }

  setPost(formId) {
    const form = document.getElementById(formId);
    const data = new FormData(form);

    this.options = {
      method: 'POST',
      cache: 'no-cache',
      referrerPolicy: 'no-referrer',
      body: data
    }

    return this;
  }

  fetch(callback) {
    fetch(this.url, this.options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`ajax failure: HTTP ${response.status} ${this.options.method} ${this.url}`);
        }

        return response.json()
      })
      .then(callback)
      .catch((error) => window.alert(error.message || error));
  }
}
