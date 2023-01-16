import { View, StyleSheet, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { wp } from '../../global'
import EventCard from './EventCard'
import { API_PATH } from '../../config'

const Events = (props: any) => {
    const {
        // data = [],
        navigation = {}
    } = props

    const [refetch, setRefetch] = useState(true);
    const [events, setEvents] = useState([])

    useEffect(() => {
        const timerID = setInterval(() => {
            setRefetch((prevRefetch) => {
                return !prevRefetch;
            });
        }, 30000);

        return () => {
            clearInterval(timerID);
        };

    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const eventsResponse = await fetch(`${API_PATH}?events=-1`, {
                    method: 'GET',
                });
                const eventsJson = await eventsResponse.json();
                console.log("[=====eventsJson======]", eventsJson)
                console.log("[=====eventsJson Stringify======]", JSON.stringify(eventsJson))
                setEvents(eventsJson)
            } catch (error) {
                console.log("[=====Fetch mealsJson && eventsJson ERR======]", error)
            }
        };
        fetchData();
    }, [refetch])

    const onEventPress = (eventId: any) => {
        // console.log("[==EventDetails==]")
        navigation.navigate('EventDetails', { eventId: eventId })
        // console.log("[==EventDetails==]")
    }

    const renderList = ({ item }: any) => {
        return (
            <EventCard
                onPress={onEventPress.bind(null, item.id)}
                item={item}
            />
        )
    }
    return (
        <View style={Styles.container}>
            <FlatList
                data={events}
                renderItem={renderList}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={Styles.listContainer}
            />
        </View>
    )
}

export default Events



const Styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContainer: {
        paddingHorizontal: wp(4),
    },

})