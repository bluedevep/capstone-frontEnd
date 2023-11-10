import React, { Component } from "react";
import axios from "axios";

import MenuSidebarList from "../menu-management/menu-sidebar-list";
import MenuForm from "../menu-management/menu-form";

export default class MenuManager extends Component {
  constructor() {
    super();

    this.state = {
      menuItems: [],
      menuToEdit: {},
    };

    this.handleNewFormSubmission = this.handleNewFormSubmission.bind(this);
    this.handleEditFormSubmission = this.handleEditFormSubmission.bind(this);
    this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);

    this.clearmenuToEdit = this.clearmenuToEdit.bind(this);
    this.getMenuItems = this.getMenuItems.bind(this);
    // this.menuToEdit = this.menuToEdit.bind(this);
  }

  clearmenuToEdit() {
    this.setState({
      menuToEdit: {},
    });
  }

  handleEditClick(menuItem) {
    this.setState({
      menuToEdit: menuItem,
    });
  }

  handleDeleteClick(menuItem) {
    console.log("handleDeleteClick", menuItem);

    axios
      .delete(`https://fangaloka-db-b7b295303892.herokuapp.com/item/${menuItem.id}`, {
        withCredentials: true,
      })
      .then((response) => {
        //console.log("response from delete", response);
        this.setState({
          menuItems: this.state.menuItems.filter((item) => {
            return item.id !== menuItem.id;
          }),
        });
        return response.data;
      })
      .catch((error) => {
        console.log("error del handleDeleteClick", error);
      });
  }

  handleEditFormSubmission() {
    this.getMenuItems();
  }

  handleNewFormSubmission(menuItem) {
    console.log("handleNewFormSubmission", menuItem);
    // update the menuItems state
    this.setState({
      menuItems: [menuItem].concat(this.state.menuItems),
    });

    //add the portfolio item to the list
  }

  handleFormSubmissionError(error) {
    console.log("error en handleFormSubmissionError", error);
  }

  getMenuItems() {
    axios
      .get("https://fangaloka-db-b7b295303892.herokuapp.com/items", { withCredentials: true })
      .then((response) => {
        console.log("response.data from getMenuItems", response.data);
        this.setState({
          menuItems: [...response.data],
        });
        console.log(this.state.menuItems);
      })
      .catch((error) => {
        console.log("error in getMenuItems", error);
      });
  }

  componentDidMount() {
    {
      this.getMenuItems();
    }
  }

  render() {
    return (
      <div className="portfolio-manager-wrapper">
        <div className="left-column">
          <MenuForm
            data={this.state.menuItems}
            handleNewFormSubmission={this.handleNewFormSubmission}
            handleEditFormSubmission={this.handleEditFormSubmission}
            handleFormSubmissionError={this.handleFormSubmissionError}
            clearmenuToEdit={this.clearmenuToEdit}
            menuToEdit={this.state.menuToEdit}
            getMenuItems={this.getMenuItems}
          />
        </div>

        <div className="right-column">
          <MenuSidebarList
            handleEditClick={this.handleEditClick}
            handleDeleteClick={this.handleDeleteClick}
            data={this.state.menuItems}
          />
        </div>
      </div>
    );
  }
}
