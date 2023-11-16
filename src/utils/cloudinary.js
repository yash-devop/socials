import cloudinary from 'cloudinary';

cloudinary.v2.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_APIKEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_API_SECRET
})

// const uploads =(file,folder)=>{
//     return new Promise((resolve,reject)=>{
//         cloudinary.v2.uploader.upload(
//             file,
//             (result)=>{
//                 resolve({
//                     public_id:result.public_id,
//                     url:result.url
//                 })
//             },
//             {
//                 resource_type: "auto",
//                 folder: folder
//             }
//         )
//     })
// }

export { cloudinary }