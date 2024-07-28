import React, { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native'

import CurrentPrice from './src/components/CurrentPrice/index'
import HistoryGraphic from './src/components/HistoryGraphic/index'
import QuotationsList from './src/components/QuotationsList/index'

  function addZero(number){
    if(number<=9){
      return "0"+number
    }
    return number
  }

  function url(qtdDays){

    const date = new Date()

    const listLastDays = qtdDays

    const end_date = `${date.getFullYear()}-${addZero(date.getMonth()+1)}-${addZero(date.getDate())}`
    
    date.setDate(date.getDate() - listLastDays)

    const start_date = `${date.getFullYear()}-${addZero(date.getMonth()+1)}-${addZero(date.getDate())}`

    const url = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${start_date}&end=${end_date}`

    return url

  }

  async function getListCoins(url){

    let response = await fetch(url)

    let returnApi = await response.json()

    let selectListQuotations = returnApi.bpi

    const queryCoinsList = Object.keys(selectListQuotations).map((key)=>{
      return {
        data: key.split("-").reverse().join("/"),
        valor: selectListQuotations[key]
      }
    })

    let data = queryCoinsList.reverse()

    return data

  }

  async function getPriceCoinsGraphic(url){

    let responseG = await fetch(url)

    let returnApiG = await responseG.json()

    let selectListQuotationsG = returnApiG.bpi

    const queryCoinsList = Object.keys(selectListQuotationsG).map((key)=>{
        return selectListQuotationsG[key]
    })

    let dataG = queryCoinsList

    return dataG

  }

export default function App() {

  const [coinsList, setCoinsList] = useState([])
  const [coinsGraphicList, setCoinsGraphicList] = useState([])
  const [days, setDays] = useState(30)
  const [updateData, setUpdateData] = useState(true)

  const [price, setPrice] = useState(0)

  function updateDay(number){
    setDays(number)
    setUpdateData(true)
  }

   function priceQuotation(){
      setPrice(coinsGraphicList.pop())
    }

  useEffect(() => {
    priceQuotation()
  }, [coinsGraphicList])

  useEffect(()=>{

    getListCoins(url(days)).then((data)=>{
      setCoinsList(data)
    })
    
    getPriceCoinsGraphic(url(days)).then((dataG)=>{
      setCoinsGraphicList(dataG)
    })

    if(updateData){
      setUpdateData(false)
    }

  }, [updateData])

  return (
    <SafeAreaView style={styles.container}>

      <StatusBar
      backgroundColor="#f50d41" 
      barStyle="dark-content"
      />

      <CurrentPrice lastCotation={price}/>

      <HistoryGraphic infoDataGraphic={coinsGraphicList}/>

      <QuotationsList filterDay={updateDay} listTransactions={coinsList}/>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    paddingTop: Platform.OS === "android" ? 60 : 0
  },
});
