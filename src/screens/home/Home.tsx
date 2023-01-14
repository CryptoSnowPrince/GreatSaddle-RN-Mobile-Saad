import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Container from '../../components/Container'
import { Colors, Images } from '../../res'
import EventsMealsBar from './EventsMealsBar'
import Styles from './Styles'
import MyTableBtn from './MyTableBtn'
import TableSlider from './TableSlider'
import BottomBar from './BottomBar'
import { Cards } from '../cards';
import { mealsData, eventsData } from './Data'
import { getAsyncData, postAsyncData } from '../../utils/fetch'

const Home = (props: any) => {
    const [tableBtnPressed, setTableBtnPressed] = useState(false)
    const [cardsVisible, setCardsVisible] = useState(false)
    const [cards, setCards] = useState([
        {
            image: Images.card1,
            id: '1'
        },
        {
            image: Images.card2,
            id: '2'
        },
        {
            image: Images.card3,
            id: '3'
        }
    ])
    const [events, setEvents] = useState(eventsData)
    const [meals, setMeals] = useState(mealsData)

    useEffect(() => {
        const getMoviesFromApiAsync = async () => {
            try {
                // console.log("[=====TG Fetch2 Start======]")
                const response = await fetch('http://192.168.103.42/url.php', {
                    method: 'GET',
                });
                // console.log("[=====TG Fetch2 Response======]", response)
                const json = await response.json();
                // console.log("[=====TG Fetch2 Json======]", json)
                setMeals(json)
                // console.log("[=====TG Fetch2 Json======]", JSON.stringify(json))
            } catch (error) {
                console.log("[=====TG Fetch2 ERR======]", error)
            }
        };
        getMoviesFromApiAsync();
    }, [])


    const onTableBtnPress = () => {
        setTableBtnPressed(!tableBtnPressed)
    }

    const onCardArrowPress = () => {
        setCardsVisible(!cardsVisible)
    }

    const RenderMyTableBtn = () => (
        <MyTableBtn
            onPress={onTableBtnPress}
            positionBottom={tableBtnPressed}
        />
    )

    const onBarBtnPress = (active: any) => {
        setTableBtnPressed(true)
    }

    const RenderEventsMealsBar = () => (
        <EventsMealsBar
            events={events}
            meals={meals}
            dataVisible={tableBtnPressed}
            onBarBtnPress={onBarBtnPress}
            navigation={props.navigation}
        />
    )

    const RenderTableSlider = () => (
        <TableSlider />
    )

    const RenderCards = () => (
        <Cards
            visible={cardsVisible}
            onPress={onCardArrowPress}
            data={cards}
            navigation={props.navigation}
        />
    )

    return (
        <Container
            barBg={Colors.theme}
            barStyle={'light-content'}
            style={Styles.container}
        >

            <View style={Styles.containerInnerOne}>
                {
                    cardsVisible ?
                        <View style={cardsVisible && !tableBtnPressed ? {} : Styles.containerInnerOne}>
                            <RenderCards />
                            <RenderEventsMealsBar />
                        </View>
                        :
                        <View style={!tableBtnPressed ? {} : Styles.containerInnerOne}>
                            <RenderEventsMealsBar />
                            <RenderCards />
                        </View>
                }
                {
                    tableBtnPressed ?
                        <View>
                            <RenderMyTableBtn />
                        </View>
                        :
                        <View style={Styles.containerInnerOne}>
                            <RenderMyTableBtn />
                            <RenderTableSlider />
                        </View>
                }

            </View>
            <View style={[Styles.bottomBar, Styles.shadow]}>
                <BottomBar />
            </View>
        </Container >
    )
}

export default Home