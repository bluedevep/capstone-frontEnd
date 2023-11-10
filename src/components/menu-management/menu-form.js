import React, { Component, useRef } from "react";
import axios from "axios";
import DropzoneComponent from "react-dropzone-component";

import "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";

export default class MenuForm extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      name: "",
      description: "",
      category: "",
      allergens: "",
      price: null,
      is_customizable: false,
      image: "",
      updated_price: null,
      editMode: false,
      apiUrl: "https://fangaloka-db-b7b295303892.herokuapp.com/item",
      apiAction: "post",
    };

    // allergens,
    // category
    // description
    // id
    // image
    // is_customizable
    // name
    // price
    //pdated_price: null

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.componentConfig = this.componentConfig.bind(this);
    this.djsConfig = this.djsConfig.bind(this);

    this.handleImageDrop = this.handleImageDrop.bind(this);

    this.deleteImage = this.deleteImage.bind(this);

    this.imageRef = React.createRef();
  }

  deleteImage(imageType) {
    //console.log("deleteImage", imageType);

    axios
      .delete(
        `https://api.devcamp.space/portfolio/delete-portfolio-image/${this.state.id}?image_type=${imageType}`,
        { withCredentials: true }
      )
      .then((response) => {
        //console.log("response de deleteImage", response);
        this.setState({
          [`${imageType}_url`]: "",
        });
      })
      .catch((error) => {
        console.log("error in deleteImage", error);
      });
  }

  componentDidUpdate() {
    if (Object.keys(this.props.menuToEdit).length > 0) {
      const {
        id,
        name,
        description,
        category,
        allergens,
        image,
        price,
        is_customizable,
        updated_price,
      } = this.props.menuToEdit;

      this.props.clearmenuToEdit();
      console.log("ëdit id", this.props.menuToEdit);

      this.setState({
        id: id,
        name: name || "",
        description: description || "",
        category: category || "",
        allergens: allergens || "",
        image: image || "",
        is_customizable: false,
        price: price || null,
        updated_price: null,

        editMode: true,
        apiUrl: `https://fangaloka-db-b7b295303892.herokuapp.com/item/${id}`,
        apiAction: "patch",
      });
    }
  }

  handleImageDrop() {
    return {
      addedfile: (file) => this.setState({ image: file }),
    };
  }

  componentConfig() {
    return {
      iconFiletypes: [".jpg", ".png"],
      showFiletypeIcon: true,
      postUrl: "https://httpbin.org/post",
    };
  }

  djsConfig() {
    return {
      addRemoveLinks: true,
      maxFiles: 1,
    };
  }

  buildForm() {
    let formData = new FormData();

    formData.append("name", this.state.name);
    formData.append("price", this.state.price);
    formData.append("description", this.state.description);
    formData.append("category", this.state.category);
    formData.append("allergens", this.state.allergens);
    formData.append("is_customizable", this.state.is_customizable);
    formData.append("updatated_price", this.state.updated_price);

    if (this.state.image) {
      formData.append("image", this.state.image);
    }
    //debugger;

    return formData;
  }

  create(data) {
    axios
      .post("https://fangaloka-db-b7b295303892.herokuapp.com/item", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        this.resetForm();
        this.props.getMenuItems();
      })
      .catch((error) => {
        console.log("error en menu-form handlesubmit fn", error);
      });
  }

  edit(data) {
    axios
      .patch(`https://fangaloka-db-b7b295303892.herokuapp.com/item/${this.state.id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        this.resetForm();
        this.props.getMenuItems();
      })
      .catch((error) => {
        console.log("error en menu-form handlesubmit fn", error);
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: name === "price" ? parseFloat(value) : value,
    });
  }

  resetForm() {
    this.setState({
      name: "",
      description: "",
      category: "",
      allergens: "",
      price: null,
      is_customizable: null,
      image: null,
      updated_price: null,
    });
    this.inputRef.current.checked = false;
  }

  handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    let name = formData.get("name");
    let allergens = formData.get("allergens");
    let price = formData.get("price");
    let category = formData.get("category");
    let is_customizable = this.state.is_customizable;

    let description = formData.get("description");
    let image = this.state.image ? this.state.image.dataURL : null;
    const data = {
      name,
      allergens,
      price,
      category,
      is_customizable,
      description,
      image,
    };
    // console.log("formData", formData);
    // console.log("name", data.image);
    console.log("name", data);
    console.log("event del handlesubmit", event);
    console.log("edit mode", this.state.editMode);
    console.log("edit id", this.state.id);

    this.state.editMode ? this.edit(data) : this.create(data);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="portfolio-form-wrapper">
        <div className="two-column">
          <input
            type="text"
            name="name"
            placeholder="Menu Item Name"
            value={this.state.name}
            onChange={this.handleChange}
          />

          <input
            type="text"
            name="allergens"
            placeholder="Menu Item Allergens"
            value={this.state.allergens}
            onChange={this.handleChange}
          />
        </div>

        <div className="two-column">
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={this.state.price ? this.state.price.toString() : ""}
            onChange={this.handleChange}
          />

          <select
            className="select-element"
            name="category"
            value={this.state.category}
            onChange={this.handleChange}
          >
            <option value="">Select a Category</option>
            <option value="Burger">Burger</option>
            <option value="Baguette">Baguette</option>
            <option value="Snack">Snack</option>
            <option value="Drink">Drink</option>
            <option value="Dessert">Dessert</option>
          </select>
        </div>

        <div className="one-column">
          <label htmlFor="is_customizable">Is customizable?</label>
          <input
            ref={this.inputRef}
            type="checkbox"
            name="is_customizable"
            check={this.state.is_customizable}
            onChange={(e) => (this.state.is_customizable = e.target.checked)}
          />
        </div>

        <div className="one-column">
          <textarea
            name="description"
            placeholder="Description"
            value={this.state.description}
            onChange={this.handleChange}

            //rows="5"
            //cols="45"
          />
        </div>

        <div className="image-uploaders">
          {this.state.image && this.state.editMode ? (
            <div className="portfolio-manager-image-wrapper">
              <img src={this.state.image} />

              <div className="image-removal-link">
                <a onClick={() => this.deleteImage("image")}>Remove file</a>
              </div>
            </div>
          ) : (
            <DropzoneComponent
              ref={this.imageRef}
              config={this.componentConfig()}
              djsConfig={this.djsConfig()}
              eventHandlers={this.handleImageDrop()}
            >
              <div className="dz-message">Thumbnail</div>
            </DropzoneComponent>
          )}
        </div>

        <div>
          <button className="btn" type="Submit">
            Save
          </button>
        </div>
      </form>
    );
  }
}
