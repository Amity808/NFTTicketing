


const uploadImage = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    const pinataMetadata = JSON.stringify({
        name: 'File name'
    })

    formData.append('pinataMetadata', pinataMetadata)

    try {
        const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`
            }
        })
        return res
        console.log(res.data);
    } catch (error) {
        console.log(error);
    }
}


const uploadFile = async (name, description, external_url, image) => {

    const data = JSON.stringify({
        pinataContent: {
            name: name,
            description: description,
            external_url: external_url,
            image: image
        },
        pinataMetadata: {
            name: "metadata.json"
        }
    });

    try {
        const res = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
            method: "POST",
            body: data,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + process.env.NEXT_PUBLIC_PINATA_JWT
            }
        })

        console.log(res.data)
        console.log(res);
    } catch (error) {
        console.log(error);
    }
}