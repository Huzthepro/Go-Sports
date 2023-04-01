import axios from "axios";

class Fetcher {
  constructor() {
    // this.apiUrl = "https://gosports.onrender.com/api/";
    this.apiUrl = "http://localhost:4000/api/";
    this.headers = {
      "Content-Type": "application/json",
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem("user"))?.token || "",
    };
  }

  get(url) {
    return this.call(url, "GET");
  }

  post(url, data) {
    return this.call(url, "POST", data);
  }

  patch(url, data) {
    return this.call(url, "PATCH", data);
  }

  delete(url) {
    return this.call(url, "DELETE");
  }

  call(url, type, input = {}) {
    const content = {
      method: type,
      url: this.apiUrl + url,
      headers: this.headers,
      data: input,
    };
    return axios(content)
      .then((response) => {
        if (response.data) {
          return Promise.resolve(response.data);
        }
        return Promise.reject(response.data);
      })
      .catch((exception) => {
        return Promise.reject(exception);
      });
  }
}

export default Fetcher;
