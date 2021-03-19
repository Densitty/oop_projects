function getElement(selection) {
  const element = document.querySelector(selection);
  if (element) {
    return element;
  }
  throw new Error(
    `Please check "${selection}" selector, no such element exists`
  );
}

class Gallery {
  constructor(element) {
    this.element = element;
    // this.list = Array.from(element.querySelectorAll(".img"));
    this.list = [...element.querySelectorAll(".img")];

    // we target the modal and the image
    this.modal = getElement(".modal");
    this.modalImg = getElement(".main-img");
    this.modalImageName = getElement(".image-name");
    this.modalImages = getElement(".modal-images");
    this.closeBtn = getElement(".close-btn");
    this.nextBtn = getElement(".next-btn");
    this.prevBtn = getElement(".prev-btn");

    // bind functions from the container/element to the class
    // this.openModal = this.openModal.bind(this);

    // easiest wasy of binding this to class is using the ES6 arrow fxn
    // this.element.addEventListener("click", (e) => this.openModal());

    // or go the old way of
    this.element.addEventListener(
      "click",
      function (e) {
        if (e.target.classList.contains("img")) {
          this.openModal(e.target, this.list);
        }
      }.bind(this)
    );

    // this.closeBtn.addEventListener(
    //   "click",
    //   function (e) {
    //     this.closeModal(e);
    //   }.bind(this)
    // );
  }

  openModal(selectedImage, list) {
    // console.log(this.modalImages);
    // open the modal
    this.modal.classList.add("open");
    // drop the image selected/clicked onto the modal main-image
    this.setMainModalImage(selectedImage);
    // get other images from the list of images
    this.modalImages.innerHTML = list
      .map(function (image) {
        // console.log(image);
        return `
          <img
            src="${image.src}"
            title="${image.title}"
            class="${
              selectedImage.dataset.id === image.dataset.id
                ? "modal-img selected"
                : "modal-img"
            }"
            title="${image.title}"
            alt="${image.alt}"
            data-id='${image.dataset.id}'
          />
        `;
      })
      .join("");
    // close the modal
    this.closeBtn.addEventListener("click", this.closeModal.bind(this));
    this.prevBtn.addEventListener("click", this.prevImage.bind(this));
    this.nextBtn.addEventListener("click", this.nextImage.bind(this));
    this.modalImages.addEventListener(
      "click",
      this.selectImageInModal.bind(this)
    );
  }

  selectImageInModal(e) {
    if (e.target.classList.contains("modal-img")) {
      // remove the selected class from the main image displayed on modal
      this.modalImages.querySelector(".selected").classList.remove("selected");
      // set the main modal-image to image selected
      this.setMainModalImage(e.target);
      // add the selected class to it to distinguish it from other images in modal-images
      e.target.classList.add("selected");
    }
  }

  // set the main image in modal
  setMainModalImage(selectedImage) {
    // get the main modal image
    this.modalImg.src = selectedImage.src;
    this.modalImageName.textContent = selectedImage.title;
  }

  // close the modal
  closeModal() {
    // console.log(this);
    this.modal.classList.remove("open");
    // immediately we close the modal, remove all event listeners
    // if not, the eventListeners will be added ontop, thus firing off multiple even listeners at the same time
    this.closeBtn.removeEventListener("click", this.closeModal.bind(this));
    this.prevBtn.removeEventListener("click", this.prevImage.bind(this));
    this.nextBtn.removeEventListener("click", this.nextImage.bind(this));
    this.modalImages.removeEventListener(
      "click",
      this.selectImageInModal.bind(this)
    );
  }

  // next image
  nextImage() {
    // check for the selected image
    const selected = this.modalImages.querySelector(".selected");
    // check if the image selected has next sibling and if not, set the first image on the parent of the selected image to be the next
    const next =
      selected.nextElementSibling || this.modalImages.firstElementChild;

    // remove the 'selected' class from the selected image
    selected.classList.remove("selected");
    // remove the 'selected' class from the next image
    next.classList.add("selected");
    this.setMainModalImage(next);
  }

  // prev image
  prevImage() {
    const selected = this.modalImages.querySelector(".selected");
    const prev =
      selected.previousElementSibling || this.modalImages.lastElementChild;
    selected.classList.remove("selected");
    prev.classList.add("selected");
    this.setMainModalImage(prev);
  }
}

const nature = new Gallery(getElement(".nature"));
const city = new Gallery(getElement(".city"));
