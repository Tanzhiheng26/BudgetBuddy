import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import { auth } from '../../firebase'
import { Modal } from './Modal';
import { deleteGroupExpense } from '../../firestore';


const EZGroupExpenseItem = ({ id, uid, name, username, cost, date, deadline, splitData, groupID, onRefresh }) => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleModal = () => setIsModalVisible(() => !isModalVisible);

    const handleDeleteGroupExpense = () => {
        return Alert.alert(
            "Confirm",
            "Are you sure you want to delete this shared expense?",
            [{
                text: "Yes",
                onPress: () => {
                    deleteGroupExpense(id, groupID);
                    handleModal();
                    onRefresh();
                },
            }, {
                text: "No",
            },]
        );
    }

    function getCostDisplay() {
        let total = 0;
        if (auth.currentUser.uid === uid) {

            for (const indivCost of splitData.filter((ele) => ele.memberUID !== uid)) {
                total += parseFloat(indivCost.memberCost)
            }
            return total;
        } else {
            const member = splitData.filter((ele) => ele.memberUID === auth.currentUser.uid)
            return member.length === 0
                ? 0
                : parseFloat(member[0].memberCost)
        }

    }
    const CostDisplay = () => {
        return (auth.currentUser.uid === uid) ? (
            <Text style={styles.text}>You lent ${getCostDisplay()}</Text>
        ) : (
            <Text style={styles.text}>You borrowed ${getCostDisplay()}</Text>
        )
    }




    const ModalDisplayItem = ({ indivUsername, indivCost }) => {
        return (
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.text}>{indivUsername} </Text>
                <Text style={styles.oweText}>owes </Text>
                <Text style={styles.text}> ${indivCost}</Text>
            </View>
        )
    }

    function ModalDisplay() {
        list = [];
        for (let i = 0; i < splitData.length; i++) {
            list.push(<ModalDisplayItem key={i}
                indivUsername={splitData[i].memberUsername}
                indivCost={splitData[i].memberCost} />)
        }
        return list;
    }


    return (
        <View style={{ paddingHorizontal: 10 }}>
            <TouchableOpacity
                style={{
                    borderWidth: 1,
                    borderRadius: 20,
                    paddingVertical: 15

                }}
                onPress={handleModal}>
                <View style={styles.row}>
                    <View style={{ flex: 1, marginLeft: 20 }}>
                        <Text style={styles.text}>{name}: ${cost}</Text>
                        <Text style={styles.text}>Paid by: {username}</Text>
                    </View>

                    <View style={{ flex: 1 }}>
                        <Text style={styles.text}>{deadline}</Text>
                        <CostDisplay />
                    </View>

                </View>
            </TouchableOpacity>

            <Modal isVisible={isModalVisible}>
                <Modal.Container>
                    <Modal.Header title={name} />
                    <Modal.Body>
                        <View style={{ alignItems: "center", paddingTop: 20 }}>
                            <Text style={styles.text}>Paid By: {username}</Text>
                            <Text style={styles.text}>Total Cost: ${cost}</Text>
                        </View>
                        <View style={{ alignItems: "center", paddingTop: 20 }}>
                            {ModalDisplay()}

                        </View>
                    </Modal.Body>
                    <Modal.Footer style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={handleModal} style={styles.button}>

                            <Text>Back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleDeleteGroupExpense} style={styles.button}>
                            <Text>Delete Expense</Text>
                        </TouchableOpacity>
                    </Modal.Footer>
                </Modal.Container>
            </Modal>
        </View >
    )
}

export default EZGroupExpenseItem

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        marginBottom: 10
    },
    text: {
        fontSize: 18,
    },
    oweText: {
        fontSize: 18,
        color: 'red'
    },
    button: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        width: 120,
        height: 35,
        marginHorizontal: 10,
        borderRadius: 10,
        marginTop: 15
    },
})