import axios from 'axios';
import { authHeader } from '../helpers/authHeader';

// const campaignService = ({ url, data }) => {
// const campaignService = function (url, data) {
//   axios
//     .post(url, data)
//     .then(res => {
//       return res;
//     })
//     .catch(err => {
//       console.log("Error in create campaign!");
//       return err;
//     });
// }

// const campaignService =
//   async function createCampaign(state, url, data) {
//     console.log('im here', state);
//     try {
//       const response = await axios.post(url, data);
//       console.log(response);
//     } catch (error) {
//       console.error(error);
//     }
//   }

// export default campaignService;

// export const campaignService = {
//   create,
//   save,
//   getAll,
//   getById,
//   update,
//   delete: _delete
// };

export async function create(url, data) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };
  const response = await fetch(url, requestOptions);
  return handleResponse(response);;
}

export async function getCampaign(url, data) {
  const requestOptions = {
    method: 'GET',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };
  const response = await fetch(url, requestOptions);
  return handleResponse(response);;
}


function handleResponse(response) {
  console.log('response', response);
  return response.text().then(text => {
    console.log('text', text);
    const data = (text && (typeof text === "string") && (text.trim().search(/^(\[|\{){1}/) > -1) && JSON.parse(text)) || {};
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        // logout();
        // location.reload(true);
        console.log('error', response);
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}