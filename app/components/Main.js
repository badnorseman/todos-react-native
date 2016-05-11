import React, { AlertIOS, Component, Navigator, StyleSheet, View } from 'react-native'
import OneSignal from 'react-native-onesignal'
import Todos from '../components/Todos'
import { NavBarRouteMapper } from '../components/NavBarRouteMapper'

export default class Main extends Component {
  componentWillMount() {
    OneSignal.configure({
      onNotificationOpened: function (message, data, isActive) {
        if (isActive) {
          AlertIOS.alert(
            data.title,
            message,
            [ { text: 'Dismiss', onPress: null } ]
          )
        }
      }
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Navigator
          ref="navigator"
          initialRoute={{ id: 'todos', title: 'To-dos', index: 0 }}
          renderScene={this.renderScene}
          navigationBar={this.renderNavBar()}
          configureScene={this.configureScene}
        />
      </View>
    )
  }
  renderScene(navigator) {
    return (<Todos navigator={navigator} />)
  }
  renderNavBar() {
    return (<Navigator.NavigationBar routeMapper={NavBarRouteMapper} style={styles.navBar}/>)
  }
  configureScene() {
    return Navigator.SceneConfigs.FloatFromBottom
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(48,48,48)',
    flex: 1,
    flexDirection: 'column'
  },
  navBar: {
    backgroundColor: 'rgb(33,33,33)'
  }
})
