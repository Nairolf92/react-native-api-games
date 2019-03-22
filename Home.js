import React from 'react';
import { connect } from 'react-redux';
import {View, ActivityIndicator, FlatList, TouchableOpacity, AsyncStorage, StyleSheet, UIManager, LayoutAnimation, Platform, } from "react-native";
import {StackActions, NavigationEvents} from "react-navigation";
import { Text, Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

// function mapStateToProps(state) {
//     return {
//         text: state.text
//     }
// }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    padding: {
        padding: 5
    }
});

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home',
    };

    constructor(props){
        super(props);

        this.renderItem = this.renderItem.bind(this);
        this.storeAndNavigate = this.storeAndNavigate.bind(this);

        if (Platform.OS === 'android')
        {
            UIManager.setLayoutAnimationEnabledExperimental(true)
        }
    }

    state = {
        gameList: [],
        loading: true,
        asyncGameName: ""
    };

    storeAndNavigate = async (data) => {
        try {
            await AsyncStorage.setItem('asyncGameName', data.item.name);
            this.setState({asyncGameName: data.item.name});
            this.props.navigation.dispatch(StackActions.push({
                routeName: 'Details',
                params: {'gameId': data.item.id}
            }))
        } catch (e) {

        }
    }

    async componentDidMount() {
        try {
            const gameApiCall = await fetch('https://androidlessonsapi.herokuapp.com/api/game/list');
            const gameList = await gameApiCall.json();
            const asyncGameName = await AsyncStorage.getItem('asyncGameName');
            this.setState({gameList: gameList, loading: false, asyncGameName: asyncGameName});
        } catch(err) {
            console.log("Error fetching data-----------", err);
        }
    }

    renderItem(data ) {
        const boucingEntrancesArray = ['bounceIn','bounceInDown','bounceInUp','bounceInLeft','bounceInRight'];
        const bouncingInt = Math.floor(Math.random() * 5);
        const bouncingChoice = boucingEntrancesArray[bouncingInt];
        return <TouchableOpacity style={{backgroundColor: 'transparent'}}>
            <Animatable.View style={styles.padding} animation={bouncingChoice} duration={2000}>
                <Button
                    title={data.item.name}
                    onPress={() => this.storeAndNavigate(data)}
                />
            </Animatable.View>
        </TouchableOpacity>
    }

    render() {
        const { gameList, loading, asyncGameName } = this.state;
        if(!loading) {
            return <View style={ styles.container }>
                <Animatable.View animation="zoomInUp">
                    <Text h1>Liste de jeux</Text>
                </Animatable.View>
                <FlatList
                    data={gameList}
                    renderItem={this.renderItem}
                    keyExtractor={(item) => item.name}
                />
                {asyncGameName !== null ?
                    <Text h4>Vous aviez choisis : {asyncGameName}</Text>
                    :
                    <Text h4>Vous n'aviez pas choisis de jeu</Text>
                }
            </View>
        } else {
            return <ActivityIndicator/>
        }
    }
}

// export default connect(mapStateToProps)(HomeScreen);
export default HomeScreen;