import React from 'react';
import {ActivityIndicator, View, Linking} from "react-native";
import { Text, Button } from 'react-native-elements';


class DetailsScreen extends React.Component {
    state = {
        gameDetailsList: [],
        loading: true
    };

    async componentDidMount() {
        const { navigation } = this.props;
        const gameId = navigation.getParam('gameId', 'NO-ID');

        try {
            const gameApiCall = await fetch('https://androidlessonsapi.herokuapp.com/api/game/details?game_id='+gameId);
            const game = await gameApiCall.json();
            this.setState({gameDetailsList: game, loading: false});
        } catch(err) {
            console.log("Error fetching data-----------", err);
        }
    }

    render() {
        const { gameDetailsList, loading } = this.state;
        if(!loading) {
            return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text h1>{gameDetailsList.name}1</Text>
                <Text>Players : {gameDetailsList.players}</Text>
                <Text>Year : {gameDetailsList.year}</Text>
                <Text>Description: {gameDetailsList.description_en}</Text>
                <Text>Players: {gameDetailsList.players}</Text>
                <Button title="Détails" onPress={()=>{Linking.openURL(gameDetailsList.url)}}/>
            </View>
        } else {
            return <ActivityIndicator/>
        }
    }
}

export default DetailsScreen