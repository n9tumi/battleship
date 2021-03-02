import React, {Component} from 'react';
import {Text, View} from 'react-native';
import styles from '../style/style';

export default class Header extends Component {
    render() {
        return(
            <View style={styles.footer}>
               <Text style={styles.author}>
                   Author: Miikka Tuunanen
               </Text>
            </View>
        )
    }
}
