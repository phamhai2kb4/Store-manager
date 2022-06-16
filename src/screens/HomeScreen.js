import React, { useState, useEffect, useContext } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator
} from 'react-native'
import { useTheme } from '@react-navigation/native';
import UiHeader from '../components/UiHeader'
import Chart from './home/Chart';
import { useDispatch, useSelector } from 'react-redux'
import ViewResult from './home/ViewResult';
import { getSymbol } from '../utils/currency_formatter';
import { darkOrange, cyan, aqua } from '../configs/colors';
import { getOrder, getSummary } from '../service/order'

const HomeScreen = (props) => {
  const { colors } = useTheme();
  const { navigation, route } = props
  const { navigate, goBack } = navigation
  const [refreshing, setRefreshing] = useState(false)
  const [loaded, setLoaded] = useState(true)
  const info = useSelector((state) => state.personalInfo)
  const [dataSales, setDataSales] = useState();
  const [total, setTotal] = useState();
  const [summary, setSumary] = useState();
  const [vn, setVN] = useState();
  const [vn1, setVN1] = useState();
  const onRefresh = () => {
    setRefreshing(true)
    getData({}, () => setRefreshing(false))
  }

  const getPercent = () => {
    const last_month = parseFloat(total ?? 0);
    const month = parseFloat(total ? 100000000 : 0);
    const dis = month - last_month;
    const per = (month / dis);
    return {
      type: per > 0 ? 'up' : 'down',
      percent: per > 0 ? per.toFixed(2) : -per.toFixed(2),
    };
  };

  const getPercent_ = () => {
    const last_month = parseFloat(dataSales ?? 0);
    const month = parseFloat(dataSales ? 10000000 : 0);
    const dis = month - last_month;
    const per = (dis / last_month);
    return {
      type: per > 0 ? 'up' : 'down',
      percent: per > 0 ? per.toFixed(2) : -per.toFixed(2),
    };
  };

  const result_gross = getPercent();
  const result_earnings = getPercent_();
  const date = new Date()
  const date_ = `${date.getMonth() + 1}/${date.getDate()}`

  const getData = async () => {
    const res = await getOrder()
    let TotalCart = 0;
    let TotalCart_ = 0;
    let v = 0
    let v_ = 0
    Object.keys(res.orders).forEach(function (item) {
      const date1 = new Date(res.orders[item].updatedAt)
      const date2 = `${date1.getMonth() + 1}/${date1.getDate()}`
      if (res.orders[item].status === "Hoàn thành") {
        if (date_ === date2) {
          TotalCart += res.orders[item].grandTotal
          setDataSales(TotalCart)
        }
        TotalCart_ += res.orders[item].grandTotal;
        v += res.orders[item].vn;
        setTotal(TotalCart_)
        setVN(v)
      } else {
        v_ += res.orders[item].vn;
        setVN1(v_)
      }
    });
    setLoaded(false)
    setRefreshing(false)
  }
  useEffect(async () => {
    const res = await getSummary()
    setSumary(res.result.overAll)
    getData()
  }, [])


  //const result_gross = getPercent(total);

  const data = {
    labels: ["Now", "2/6", "3/6", "4/6", "5/6", "6/6", "7/6", "8/6"],
    datasets: [
      {
        data: [0,500000/1000000, 700000/1000000, 1200000/1000000, 1500000/1000000, 800000/1000000,total / 1000000],
        color: (opacity = 1) => colors.primary, // optional
        strokeWidth: 2, // optional
      },
      {
        data: [0, 300000/1000000, 500000/1000000, 700000/1000000, 1200000/1000000, 1500000/1000000, 800000/1000000],
        color: (opacity = 1) => cyan, // optional
        strokeWidth: 2, // optional
      },
    ],
    decimalPlaces: 0,
    legend: ["Tổng doanh thu", "Doanh thu tuần"], // optional
  };

  const symbol = getSymbol("đ");

  function TotalPrice(price) {
    return Number(price).toLocaleString('vi-VN');
  }

  return (
    <View style={styles.container}>
      {loaded ? (<View style={{ minHeight: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>) : (
        <View style={{ flex: 1 }}>
          {info.user != null ? <UiHeader
            title={`${info.user.name}`}
            fullname={info.user.email}
            onPress={() => {
              navigate("AccountStack")
            }} /> : null}
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View style={styles.viewTitle}>
              <Text style={{
                fontSize: 20,
                fontWeight: "500"
              }}>Tháng này </Text>
              <Text
                style={{ color: colors.primary }}
                onPress={() =>
                  navigation.navigate('ReportScreen', {
                  })
                }>Tất cả báo cáo</Text>
            </View>
            <View style={styles.viewTableInfo}>
              <View style={styles.table}>
                <ViewResult
                  title="Tổng doanh thu"
                  number={total != null ? TotalPrice(total) : 0}
                  nameIcon="cash-usd"
                  symbol={symbol}
                  symbolOnLeft={true}
                  percent={result_gross.percent ?? 0}
                  typePercent={result_gross.type ?? 0}
                />
              </View>
              <View style={styles.table}>
                <ViewResult
                  title="Doanh thu hôm nay"
                  number={dataSales != null ? TotalPrice(dataSales) : 0}
                  nameIcon="cash-multiple"
                  symbol={symbol}
                  symbolOnLeft={true}
                  percent={result_earnings.percent ?? 0}
                  typePercent={result_earnings.type ?? 0}
                  iconColor={darkOrange}
                  titleColor={darkOrange}
                />
              </View>
            </View>
            {/* <View style={styles.viewTableInfo}>
              <View style={styles.table}>
                <ViewResult
                  title="Sản phẩm"
                  number={summary.products ?? 0}
                  nameIcon="cube"
                  symbolOnLeft={true}
                />
              </View>
              <View style={styles.table}>
                <ViewResult
                  title="Khách hàng"
                  number={summary.users - 1 ?? 0}
                  nameIcon="account-multiple"
                  symbolOnLeft={true}
                  iconColor={darkOrange}
                  titleColor={darkOrange}
                />
              </View>
              <View style={styles.table}>
                <ViewResult
                  title="Đơn hàng"
                  number={summary.orders ?? 0}
                  nameIcon="account-multiple"
                  symbolOnLeft={true}
                  iconColor={darkOrange}
                  titleColor={darkOrange}
                />
                
              </View> 
            </View>*/}
            <View style={[styles.viewTableInfo, styles.tableEnd]}>
              <View style={styles.table}>
                <ViewResult
                  title="Đơn hàng đã bán"
                  number={vn ?? 0}
                  nameIcon="cube-send"
                  iconColor={colors.success}
                  titleColor={colors.success}
                />
              </View>
              <View style={styles.table}>
                <ViewResult
                  title="Đơn hàng đã nhận"
                  number={vn1 ?? 0}
                  nameIcon="receipt"
                  iconColor={aqua}
                  titleColor={aqua}
                />
              </View>
            </View>
            <View style={styles.viewTitle}>
              <Text style={{
                fontSize: 20,
                fontWeight: "500"
              }}>Giảm giá theo tuần</Text>
            </View>
            <Chart data={data} />
          </ScrollView>
        </View>)
      }

    </View>
  )
}
export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 25,
  },
  header: {
    marginBottom: 40,
    paddingTop: 20,
    flexDirection: 'row',
  },
  centerHeader: {
    flex: 1,
  },
  dotAvatar: {
    position: 'absolute',
    top: 3.5,
    left: -4,
  },
  viewTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  viewTableInfo: {
    flexDirection: 'row',
    marginHorizontal: 5,
    marginBottom: 12,
  },
  table: {
    flex: 1,
    marginHorizontal: 5,
  },
  tableEnd: {
    marginBottom: 50,
  },
})