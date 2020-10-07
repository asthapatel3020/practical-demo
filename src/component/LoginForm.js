import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import * as yup from 'yup';
import {Formik} from 'formik';
import {
  getDeviceToken,
  getDeviceType,
  getDeviceName,
  getVersion,
  getReadableVersion,
  getModel,
  getUniqueId,
} from 'react-native-device-info';

const LoginForm = (props) => {
  const loginFormSchema = yup.object({
    url: yup
      .string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        'Enter correct url!',
      )
      .required('Url is required'),
    username: yup.string().required('Username is required'),
    password: yup
      .string()
      .required('Password is required')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Must Contain 8 Characters',
      ),
  });
  const initialValues = {
    url: '',
    username: '',
    password: '',
    remember: false,
    accept: false,
  };
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flexDirection: 'column'}}>
      <View style={style.imgContainer}>
        <Image source={require('../assets/applogo.png')} />
      </View>

      <Formik
        onSubmit={(values) => {
          fetch('http://demo.ciaoworks.com/practical/login.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: values.username,
              password: values.password,
              url: values.url,
              multiple_user_login: {
                device_token: getDeviceToken(),
                device_type: getDeviceType(),
                dedevicevice_model: getModel(),
                _version: getVersion(),
                app_version: getReadableVersion(),
                device_name: getDeviceName(),
                device_uid: getUniqueId(),
              },
            }),
          })
            .then((response) => response.json())
            .then((json) => {
              Alert.alert(
                'Success',
                json.message,
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
              );
            })
            .catch((error) => {
              console.error(error);
            });
        }}
        initialValues={initialValues}
        validationSchema={loginFormSchema}>
        {({values, setFieldValue, errors, handleSubmit}) => (
          <View>
            <View
              style={[
                style.SectionStyle,
                // eslint-disable-next-line react-native/no-inline-styles
                {borderColor: errors.url ? 'red' : '#E1E1E1'},
              ]}>
              <Image
                source={require('../assets/link.png')}
                style={style.ImageStyle}
              />
              <TextInput
                style={style.inputBox}
                returnKeyType={'next'}
                onChangeText={(url) => {
                  setFieldValue('url', url);
                }}
                placeholderTextColor={'#999999'}
                placeholder="URL"
                value={values.url}
                autoCapitalize="none"
              />
            </View>
            {errors.url && (
              <View style={{marginLeft: 10}}>
                <Text style={{color: 'red'}}>{errors.url}</Text>
              </View>
            )}
            <View
              style={[
                style.SectionStyle,
                // eslint-disable-next-line react-native/no-inline-styles
                {borderColor: errors.username ? 'red' : '#E1E1E1'},
              ]}>
              <Image
                source={require('../assets/user.png')}
                style={style.ImageStyle}
              />
              <TextInput
                style={style.inputBox}
                returnKeyType={'next'}
                onChangeText={(username) => {
                  setFieldValue('username', username);
                }}
                placeholderTextColor={'#999999'}
                placeholder="Username"
                value={values.username}
                autoCapitalize="none"
              />
            </View>
            {errors.username && (
              <View style={{marginLeft: 10}}>
                <Text style={{color: 'red'}}>{errors.username}</Text>
              </View>
            )}
            <View
              style={[
                style.SectionStyle,
                // eslint-disable-next-line react-native/no-inline-styles
                {borderColor: errors.password ? 'red' : '#E1E1E1'},
              ]}>
              <Image
                source={require('../assets/link.png')}
                style={style.ImageStyle}
              />
              <TextInput
                style={style.inputBox}
                returnKeyType={'next'}
                onChangeText={(password) => {
                  setFieldValue('password', password);
                }}
                secureTextEntry
                placeholderTextColor={'#999999'}
                placeholder="Password"
                value={values.password}
                autoCapitalize="none"
              />
            </View>
            {errors.password && (
              <View style={{marginLeft: 10}}>
                <Text style={{color: 'red'}}>{errors.password}</Text>
              </View>
            )}
            <View style={style.imgContainer}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={style.btnSubmit}
                onPress={handleSubmit}>
                <Text style={style.btnTxt}> Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
      <View />
    </View>
  );
};

const style = StyleSheet.create({
  imgContainer: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  SectionStyle: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    borderWidth: 0.5,
    height: 50,
    borderRadius: 5,
    margin: 10,
  },
  ImageStyle: {
    marginRight: 10,
    height: 17,
    width: 17,
    marginLeft: 10,
    alignItems: 'center',
  },
  inputBox: {
    width: '100%',
    fontSize: 16,
    color: '#000',
  },
  btnSubmit: {
    backgroundColor: '#F76951',
    width: 100,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTxt: {fontSize: 17, color: 'white'},
});

export default LoginForm;
