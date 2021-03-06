/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from 'react';
import { Input, Button } from 'reactstrap';
import DatasourceBoxContainer from '../../containers/groups/DatasourceBoxContainer';
import { SelectionType } from '../../containers/groups/DatasourceBoxContainer';
import { NamedIDItem } from '../../types/items';
import { CreateNewBlankGroupAction, EditGroupNameAction } from '../../types/redux/groups';
import HeaderContainer from '../../containers/HeaderContainer';
import FooterComponent from '../FooterComponent';
import {  browserHistory } from 'react-router';
import { FormattedMessage, InjectedIntlProps, injectIntl, defineMessages } from 'react-intl';


interface CreateGroupProps {
	meters: NamedIDItem[];
	groups: NamedIDItem[];
	createNewBlankGroup(): CreateNewBlankGroupAction;
	editGroupName(name: string): EditGroupNameAction;
	submitGroupInEditingIfNeeded(): Promise<any>;
}

type CreateGroupPropsWithIntl = CreateGroupProps & InjectedIntlProps;

class CreateGroupComponent extends React.Component<CreateGroupPropsWithIntl, {}> {
	constructor(props: CreateGroupPropsWithIntl) {
		super(props);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleCreateGroup = this.handleCreateGroup.bind(this);
		this.handleReturnToView = this.handleReturnToView.bind(this);
	}

	public componentWillMount() {
		this.props.createNewBlankGroup();
	}

	public render() {
		const divStyle: React.CSSProperties = {
			paddingTop: '35px'
		};
		const divBottomStyle: React.CSSProperties = {
			marginBottom: '20px'
		};
		const textStyle: React.CSSProperties = {
			fontWeight: 'bold',
			margin: 0
		};
		const centerTextStyle: React.CSSProperties = {
			textAlign: 'center'
		};
		const messages = defineMessages({ name: { id: 'name' }});
		return (
			<div>
				<HeaderContainer />
				<div className='container-fluid'>
					<div style={divStyle} className='col-6'>
						<h3 style={centerTextStyle}>
							<FormattedMessage id='create.group' />
						</h3>
						<div style={divBottomStyle}>
							<p style={textStyle}>
								<FormattedMessage id='name' />:
							</p>
							<Input type='text' placeholder={this.props.intl.formatMessage(messages.name)} onChange={this.handleNameChange} />
						</div>
						<div style={divBottomStyle}>
							<p style={textStyle}>
								<FormattedMessage id='select.meters' />:
							</p>
							<DatasourceBoxContainer type='meter' selection={SelectionType.All} />
						</div>
						<div style={divBottomStyle}>
							<p style={textStyle}>
								<FormattedMessage id='select.groups' />:
							</p>
							<DatasourceBoxContainer type='group' selection={SelectionType.All} />
						</div>
						<div className='row'>
							<div className='col-6'>
								<Button outline type='submit' onClick={this.handleReturnToView}>
									<FormattedMessage id='cancel' />
								</Button>
							</div>
							<div className='col-6 d-flex justify-content-end'>
								<Button outline type='submit' onClick={this.handleCreateGroup}>
									<FormattedMessage id='create.group' />
								</Button>
							</div>
						</div>
					</div>
				</div>
				<FooterComponent />
			</div>
		);
	}

	private handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
		const value = e.target.value;
		if (value) {
			this.props.editGroupName(value as string);
		} else {
			this.props.editGroupName('');
		}
	}

	private handleCreateGroup() {
		this.props.submitGroupInEditingIfNeeded();
	}

	private handleReturnToView() {
		browserHistory.push('/groups');
	}
}

export default injectIntl<CreateGroupProps>(CreateGroupComponent);
