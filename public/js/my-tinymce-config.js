function example_image_upload_handler(blobInfo, success, failure, progress) {
  var xhr, formData;

  xhr = new XMLHttpRequest();
  xhr.withCredentials = false;
  xhr.open("POST", "/upload");

  xhr.upload.onprogress = function (e) {
    progress((e.loaded / e.total) * 100);
  };

  xhr.onload = function () {
    var json;

    if (xhr.status === 403) {
      failure("HTTP Error: " + xhr.status, { remove: true });
      return;
    }

    if (xhr.status < 200 || xhr.status >= 300) {
      failure("HTTP Error: " + xhr.status);
      return;
    }

    json = JSON.parse(xhr.responseText);

    if (!json || typeof json.location != "string") {
      failure("Invalid JSON: " + xhr.responseText);
      return;
    }

    success(json.location);
  };

  xhr.onerror = function () {
    failure(
      "Image upload failed due to a XHR Transport error. Code: " + xhr.status
    );
  };

  formData = new FormData();
  formData.append("file", blobInfo.blob(), blobInfo.filename());
  xhr.send(formData);
}
tinymce.init({
  height: "500",
  selector: "textarea",
  paste_data_images: true,
  content_css: '/css/styles.css',
  importcss_append: true,
  plugins: [
    "advlist autolink lists link image charmap print preview hr anchor pagebreak",
    "searchreplace wordcount visualblocks visualchars code fullscreen",
    "insertdatetime media nonbreaking save table  directionality",
    "emoticons template paste textpattern importcss",
  ],
  toolbar1:
    "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
  toolbar2:
    "print preview media | forecolor backcolor emoticons | visualblocks",
  image_list: "/files",
  image_advtab: true,
  images_upload_handler: example_image_upload_handler,
  image_class_list: [
    { title: "None", value: "" },
    { title: "No border", value: "img_no_border" },
    { title: "Green border", value: "img_green_border" },
    { title: "Blue border", value: "img_blue_border" },
    { title: "Red border", value: "img_red_border" },
    { title: "thumbnail", value: "thumbnail" },
  ],
  templates: [
    {
      title: "Test template 1",
      content: "Test 1",
    },
    {
      title: "Test template 2",
      content: "Test 2",
    },
  ],
});
