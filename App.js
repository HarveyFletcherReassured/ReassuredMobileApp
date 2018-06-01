import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Button, Alert, TouchableOpacity, Image, TextInput } from 'react-native';

export default class App extends Component {
    
  constructor() {
      super()
      this.state = {
         userPassword: '',
		 userEmail: ''
      }
   }

  //This is what happens when the user selects the login button.
  loginUser = () => {
	//We need to import the sha512 library so we can hash the password
	var sha512 = require('js-sha512');
	
	try{
		//Get the email and try to hash the password.
		var dataBody = {
			email: this.state.userEmail,
			password: sha512(this.state.userPassword)
		}
	} catch (e){
		//Something went wrong, friendly prompt.
		Alert.alert("Please provide email and password.")
		return null;
	}

	//Make an API call to the login function.
	fetch("http://api.rmobileapp.co.uk/users/login", {method: "POST", body: JSON.stringify(dataBody)})
	.then(res => res.json())
	.then(
		(result) => {			
			//If the API returns JSON with the status of "200" then display a success message
			//This does not rely on the HTTP status
			if(result.status == 200){
				//Success
				Alert.alert("Login Successful! Welcome back, " + result.firstname);
				
				//Clear the input fields.
				this.refs.userEmail.clear();
				this.refs.userPassword.clear();
			} else {
				//Else, let the user know what went wrong.
				Alert.alert(result.info)
			}
		},
		(error) => {
			//General client side error message
			Alert.alert("Something went wrong please try again.")
		}
	)
	
  }
  
  registerUser = () => {
	  Alert.alert("Registration not yet enabled.")
  }
  
  suggestFeatures = () => {
	  Alert.alert("There's nothing here yet.")
  }
	
  render() {	  
    return (
      <View style={styles.container}>
		<Image source={require('./img/ReassuredText.png')} style={styles.companyLogo}/>
		<TextInput
			ref="userEmail"
			keyboardType="email-address"
			placeholder="Reassured Email Address"
			placeholderTextColor="#000000"
			style={styles.formInput}
			onChangeText={ (text) => this.setState({userEmail: text}) }
		/>
		<TextInput
			ref="userPassword"
			placeholder="Password"
			placeholderTextColor="#000000"
			secureTextEntry={ true }
			style={styles.formInput}
			onChangeText={ (text) => this.setState({userPassword: text}) }
		/>
		<TouchableOpacity
			style={styles.button}
			onPress={this.loginUser} >
			<Text style={styles.buttonText}>SIGN IN</Text>
		</TouchableOpacity>
		<TouchableOpacity
			style={styles.button}
			onPress={this.registerUser} >
			<Text style={styles.buttonText}>REGISTER</Text>
		</TouchableOpacity>
		<TouchableOpacity
			style={styles.button}
			onPress={this.suggestFeatures} >
			<Text style={styles.buttonText}>SUGGEST A FEATURE</Text>
		</TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
	paddingLeft: '10%',
	width: '90%',
    flex: 1,
    backgroundColor: '#fff',
	justifyContent: 'center'
  },
  
  formInput: {
	marginTop: 10,
	marginBottom: 10,
	borderWidth: 1,
	height: 40,
	padding: 10
  },
  
  button: {
	  marginTop: 10,
	  paddingTop: 10,
	  paddingBottom: 10,
	  backgroundColor: '#ffa500',
	  alignItems: 'center',
  },
  
  buttonText: {
	  fontSize: 18,
	  color: 'black',
	  fontWeight: 'bold'
  },
  
  companyLogo: {
	  width: "100%",
	  resizeMode: Image.resizeMode.contain,
	  marginBottom: 25
  }
});
