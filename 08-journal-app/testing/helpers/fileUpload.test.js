import { v2 as cloudinary } from "cloudinary";
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
  cloud_name: "dnd0b7zvt",
  api_key: "582963771253269",
  api_secret: "0B63SRlJCuj_jR5fGbcAkrFZaPo",
  secure: true,
});

describe("Tests in fileUpload", () => {
  test("should upload the file correctly to clodinary", async () => {
    const imageUrl =
      "https://i0.wp.com/www.dintelo.es/wp-content/uploads/2015/05/terraza-10.jpg?resize=584%2C365";

    const resp = await fetch(imageUrl);
    const blob = await resp.blob();
    const file = new File([blob], "foto.jpg");
    const url = await fileUpload(file);

    expect(typeof url).toBe("string");

    // console.log(url);
    const segments = url.split("/");
    const imageId = segments[segments.length - 1].replace(".jpg", "");

    const cloudResp = await cloudinary.api.delete_resources(
      ["journal/" + imageId],
      {
        resource_type: "image",
      }
    );
    console.log(cloudResp);
  });

  test("should return null ", async () => {
    const file = new File([], "foto.jpg");
    const url = await fileUpload(file);

    expect(url).toBe(null);
  });
});
