

export const drawOnCanvas =  async (bgImage, heroImage) => {

    const canvas = document.getElementById("canvas")

    const ctx = canvas.getContext("2d");

    const userImage = localStorage.getItem('image')

    // const name = localStorage.getItem('name')
    
    const image = await getImage(userImage)

    const hero = await getImage(heroImage)

    const bg = await getImage(bgImage)

    const width = canvas.width

    const height = canvas.height

    const heroAspectRatio =  hero.width / hero.height 

    ctx.drawImage(bg, 0, 0, width, height);

    ctx.drawImage(image, width * 0.10, height * 0.24, width * 0.35, height * 0.35);

    ctx.drawImage(hero, width * 0.40, height * 0.27, width * 0.26 / heroAspectRatio, height * 0.5 *  heroAspectRatio);

    
    // ctx.font = "18px bold Kawak_bold";
    // ctx.fillStyle = "#0f3214"

    // const length = name.length;

    // ctx.fillText(name.toUpperCase(), width * 0.1396 - (length * 12) / 2, height * 0.6969);

};




export const getImage = (image) => {
    const img = new Image();
    img.src = image;
    return img
}
  





export const loadCropImage =  async (upload) => {

    const canvas = document.getElementById("upload")

    const ctx = canvas.getContext("2d");

    const image = await getImage(upload)

    const width = image.width
    const height = image.height

    canvas.width = width
    canvas.height = height

    const raduis  = width / 2

    ctx.beginPath();
    ctx.lineColor = "#000000"
    ctx.arc(raduis, raduis, raduis, 0, 2 * Math.PI);
    ctx.clip();
    ctx.closePath();
    ctx.restore();

    ctx.drawImage(image, 0, 0);

    ctx.beginPath();
    ctx.lineColor = "#000000"
    ctx.arc(raduis, raduis, raduis, 0, 2 * Math.PI);
    ctx.clip();
    ctx.closePath();
    ctx.restore();

    return canvas.toDataURL("image/png", 1.0)


};


export const cropCanvas = (sourceCanvas,left,top,width,height) => {
    const destCanvas = document.createElement('upload');
    destCanvas.width = width;
    destCanvas.height = height;
  
    destCanvas.getContext("2d").drawImage(
        sourceCanvas,
        left,top,width,height,  // source rect with content to crop
        0,0,width,height);      // newCanvas, same size as source rect
  
    return destCanvas;
}

export const clearCanvas = (canvasId) => {

  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

}


export function toDataUrl(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}



export const download = async () => {

    const canvas = document.getElementById("canvas");

    const image = canvas.toDataURL('image/png');
    const blob = await (await fetch(image)).blob();
    const blobURL = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobURL;
    link.download = "image.png";
    link.click();
}