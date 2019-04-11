imageUpload.onchange = function (e) {
    // let formData = new FormData()
    // formData.append('uploadFile', e.target.files[0])
    // $.ajax({
    //     url: '/upload',
    //     type: 'POST',
    //     cache: false,
    //     data: formData,
    //     processData: false,
    //     contentType: false
    // })
    e.target.value = ''
}