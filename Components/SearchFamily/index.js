import React from 'react'
import {
	View,
	FlatList,
	StyleSheet,
	TouchableOpacity
} from 'react-native'
import {
    Container,
    Header,
    Content,
    List,
    ListItem,
    Text,
    Icon,
    Left,
    Body,
    Right,
    Switch,
    Thumbnail,
    Button,
    Title
} from 'native-base';
import { SearchBar } from 'react-native-elements'
import UserListConainer from '../UsersList'
import { headerBackgroundColor, headerFontColor, statusBarHeight, headerButtonColor } from '../../utils/settings'

export default class SearchFamily extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			username: '',
			searching:false
		}
	}

	handleInput=(val)=>{
		this.setState({ 
			username: val.trim(),
			searching:false
		 })
	}

	renderSearchBar = () => {
		return (
			<View style={{ flex: 1 }}>
				<SearchBar
					lightTheme
					containerStyle={{
						backgroundColor: 'transparent',
						borderBottomWidth: 0
					}}
					inputStyle={{
						backgroundColor: '#fff'
					}}
					onSubmitEditing={this.search}
					icon={{ type: 'font-awesome', name: 'search' }}
					onChangeText={this.handleInput}
					placeholder='用户名'
				/>
			</View>
		)
	};

	search = () => {
		let val = this.state.username;
		if (!val) {
			return
		}
		this.setState({searching:true})
	}

	renderSearchButton = () => {
		let username = this.state.username.trim()
		return (
			<TouchableOpacity
				activeOpacity={username.length > 0 ? 0.5 : 1}
				onPress={this.search}
			>
				<Text style={[
					styles.sendText,
					{ color: username.length > 0 ? '#0084ff' : 'gray' }
				]}>搜索</Text>
			</TouchableOpacity>
		)
	}

	render() {
		const {username,searching} = this.state
		const who = this.props.navigation.getParam('who', {});
		const me = this.props.navigation.getParam('me', {});
		return (
			<Container>
				<Header style={{ marginTop: statusBarHeight }}>
                <Left >
                  <Button
                    onPress={() => this.props.navigation.goBack()}
                    transparent
                  >
                    <Icon name='md-arrow-back' type='Ionicons' />
                  </Button>
                </Left>
                <Body style={{ alignItems: 'flex-end', justifyContent: "center", }}>
                  <Title>添加亲人</Title>
                </Body>
                <Right />
              </Header>
				<Content>
				<View style={{
					flexDirection: 'row',
					alignItems: 'center',
					borderBottomWidth: 1,
					borderBottomColor: '#ccc'
				}}>
					{this.renderSearchBar()}
					{this.renderSearchButton()}
				</View>
				{searching &&
					<UserListConainer
						username={username}
						who={who}
						me={me}
					/>
				}
				</Content>
			</Container>
		)
	}
}



const styles = StyleSheet.create({
	sendText: {
		fontWeight: '600',
		fontSize: 17,
		backgroundColor: 'transparent',
		marginLeft: 5,
		marginRight: 10,
	},
})


