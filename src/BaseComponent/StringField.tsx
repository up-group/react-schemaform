import * as React from "react";
import { UpFormControl } from "../UpForm/UpFormControl";
import { UpInput, UpEmail, UpPhone, UpText, UpButton } from "@up-group/react-controls";
import SvgIcon from '@up-group/react-controls/dist/src/Components/Display/SvgIcon';
import { style } from 'typestyle';

export default class StringField extends UpFormControl<string> {
  constructor(p, c) {
    super(p, c);
    var pattern = new RegExp(this.props.schema.pattern);
    var patternErrorMessage = this.props.schema.patternErrorMessage;
  }

  renderField() {
    switch (this.props.schema.format) {
      case "email":
        return (
          <UpEmail
            name={this.props.name}
            value={this.state.value}
            showError={this.props.showError}
            isRequired={this.props.isRequired}
            onChange={this.handleChangeEventGlobal}
          />
        );
      case "phone":
        return (
          <UpPhone
            name={this.props.name}
            value={this.state.value}
            showError={this.props.showError}
            isRequired={this.props.isRequired}
            onChange={this.handleChangeEventGlobal}
          />
        );
      case "multilineText":
        return (
          <UpText
            name={this.props.name}
            value={this.state.value}
            showError={this.props.showError}
            isRequired={this.props.isRequired}
            onChange={this.handleChangeEventGlobal}
          />
        );
      case "search":

        const searchInputStyle = style({
          position: 'relative',
          height: '44px',
          $nest: {
            '&>input': {
              height: '44px',
              borderRadius: '23px',
              border: '0',
              padding: `0 0 0 4.8%`,
              color: '#979797',
              fontFamily: 'Roboto',
              fontSize: '14px',
              backgroundColor: '#F2F2F2',
              outline: 'none',
              width: '85%'
            },
            '& .up-icon-wrapper': {
              position: 'absolute',
              zIndex: 2,
              display: "block",
              width: "1.2rem",
              top: "0.7rem",
              left: "1.1rem",
            }
          }
        });
        return (
          <div className={`${searchInputStyle} search-input-wrapper`}>
            <SvgIcon
              iconName="search"
              width={24}
              height={24}
              color="#979797"
            />
            <input
              type="text"
              placeholder="Votre recherche"
              value={this.state.value || ""}
              onChange={e => this.handleChangeEventGlobal(e, e.target.value)}
            />

            <UpButton
              intent="primary"
              actionType="search"
              onClick={(e: any) => this.props.onSearchButtonClick(e.target.value)}>
              Rechercher
          </UpButton>
          </div>

        );
      default:
        return (
          <UpInput
            name={this.props.name}
            value={this.state.value}
            showError={this.props.showError}
            isRequired={this.props.isRequired}
            onChange={this.handleChangeEventGlobal}
          />
        );
    }
  }
}
