import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';
import { PieChart, BarChart } from "react-native-chart-kit";

const ChartScreen = () => {
    const { expenses } = useContext(AppContext);
    const sliceColor = ['#F44336','#2196F3','#FFEB3B', '#4CAF50', '#FF9800']
    
    function costPerCategory() {
      expenses.sort((a, b) => a.category.localeCompare(b.category))
      let list = [];
      for (let i = 0; i < expenses.length; i++) {
        let expense = expenses[i]
        //check if the category is the same as previous
        if (i == 0 || expense.category != expenses[i - 1].category) {
          list.push({
            name: expense.category,
            totalCost: expense.cost,
            color: sliceColor.shift(),
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
          })
        } else {
          list[list.length - 1].totalCost += expense.cost;
        }
      }
      return list;
    }

    // return expenses for up to last 6 months
    function costPerMonth() {
      expenses.sort((a, b) => a.date - b.date);
      let list = [];
      for (let i = 0; i < expenses.length; i++) {
        let expense = expenses[i]
        //check if the month is the same as previous
        if (i == 0 || expense.date.getMonth() != expenses[i - 1].date.getMonth()) {
          list.push({
            month: expense.date.toLocaleString([], {month: 'short'}),
            totalCost: expense.cost
          })
        } else {
          list[list.length - 1].totalCost += expense.cost;
        }
      }
      // return last 6 elements
      return list.slice(-6);
    }

    const data = costPerCategory();
    const monthlyData = costPerMonth();
    const barData = {
      labels: monthlyData.map(x => x.month),
      datasets: [
        {
          data: monthlyData.map(x => x.totalCost)
        }
      ]
    };
    return(
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Spending by category</Text>
        </View>
        <PieChart
          data={data}
          width={Dimensions.get("window").width}
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`
          }}
          accessor={"totalCost"}
          backgroundColor={"transparent"}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Monthly spending</Text>
        </View>
        <BarChart
          style={styles.barGraph}
          data={barData}
          width={Dimensions.get("window").width}
          height={220}
          yAxisLabel="$"
          chartConfig={{
            backgroundGradientFrom: '#fff',
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: '#fff',
            backgroundGradientToOpacity: 0.5,

            fillShadowGradient: '#2E86C1', 
            fillShadowGradientOpacity: 1,
            color: (opacity = 1) => `#023047`,
            labelColor: (opacity = 1) => `#333`,
          }}
          fromZero='true'
          showValuesOnTopOfBars='true'
        />
      </View>
    );
}

export default ChartScreen

const styles = StyleSheet.create({
  container : {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title : {
    fontSize: 18,
    textDecorationLine: 'underline',
    fontWeight: 'bold'
  },
  titleContainer : {
    marginTop: 10,
    marginBottom: 10
  }
})