// export default function handler(req, res) {
//     // Access the cookies from the request headers
//     const cookieValue = res.cookie.get('token')?.value;
//     // Do something with the cookieValue
//     res.status(200).json({ cookieValue });
//     return res.next(cookieValue);
// }