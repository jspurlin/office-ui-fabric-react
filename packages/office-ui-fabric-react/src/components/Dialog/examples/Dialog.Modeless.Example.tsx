import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';

export interface IDialogModelessExampleState {
  hideDialog: boolean;
  isDraggable: boolean;
}

export class DialogModelessExample extends React.Component<{}, IDialogModelessExampleState> {
  public state: IDialogModelessExampleState = {
    hideDialog: true,
    isDraggable: false
  };

  public render() {
    const { hideDialog, isDraggable } = this.state;
    return (
      <div>
        <input type="text" placeholder="Focus Me While Open" />
        <div>
          <Checkbox label="Is Draggable" onChange={this._toggleDraggable} checked={isDraggable} disabled={!hideDialog} />
          <DefaultButton secondaryText="Opens the Sample Dialog" onClick={this._showDialog} text="Open Dialog" />
          <DefaultButton secondaryText="Closes the Sample Dialog" onClick={this._closeDialog} text="Close Dialog" />
        </div>
        <Dialog
          hidden={hideDialog}
          dialogContentProps={{
            type: DialogType.normal,
            title: 'All emails together',
            subText: 'Your Inbox has changed. No longer does it include favorites, it is a singular destination for your emails.'
          }}
          modalProps={{
            containerClassName: 'ms-dialogMainOverride',
            isModeless: true,
            isDraggable: isDraggable,
            onDismissed: this._closeDialog
          }}
        >
          <DialogFooter>
            <PrimaryButton onClick={this._closeDialog} text="Save" />
            <DefaultButton onClick={this._closeDialog} text="Cancel" />
          </DialogFooter>
        </Dialog>
      </div>
    );
  }

  private _showDialog = (): void => {
    this.setState({ hideDialog: false });
  };

  private _closeDialog = (): void => {
    this.setState({ hideDialog: true });
  };

  private _toggleDraggable = (): void => {
    this.setState({ isDraggable: !this.state.isDraggable });
  };
}
