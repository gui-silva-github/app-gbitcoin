import React, { Fragment } from 'react'
import {View, Text, Image } from 'react-native'
import styles from './styles'

export default function QuotationsItem(props){

  return (

      <View style={styles.mainContent}>
      
        <View style={styles.contextLeft}>

          <View style={styles.boxLogo}>

            <Image
            style={styles.logoBitcoin}
            source={require("../../../../assets/bitcoin.png")}
            />
            <Text style={styles.dayCotation}>{props.data}</Text>

          </View>

        </View>

          <View style={styles.contextRight}>
          
            <Text style={styles.price}>$ {props.valor}</Text>

          </View>

      </View>

  )

}