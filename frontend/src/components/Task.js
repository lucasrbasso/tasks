import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import commonStyles from '../commonStyles';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import moment from 'moment';
import 'moment/locale/pt-br';

export default (props) => {
  const awaitTask = moment();

  const doneOrNot =
    props.doneAt != null ? {textDecorationLine: 'line-through'} : {};

  const getRightContent = () => {
    return (
      <TouchableOpacity
        style={styles.right}
        onPress={() => props.onDelete && props.onDelete(props.id)}>
        <Icon name="trash" size={25} color="#FFF" />
      </TouchableOpacity>
    );
  };

  const getLeftContent = () => {
    return (
      <View style={styles.left}>
        <Icon name="trash" size={20} color="#FFF" style={styles.excludeIcon} />
        <Text style={styles.excludeText}>Excluir</Text>
      </View>
    );
  };

  return (
    <Swipeable
      renderRightActions={getRightContent}
      renderLeftActions={getLeftContent}
      onSwipeableLeftOpen={() => props.onDelete && props.onDelete(props.id)}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => props.onToggleTask(props.id)}>
          <View style={styles.checkContainer}>
            {getCheckView(props.doneAt)}
          </View>
        </TouchableWithoutFeedback>
        <View>
          <Text
            style={[
              [
                moment(new Date(awaitTask)).format('DD') >
                moment(new Date(props.estimateAt)).format('DD')
                  ? styles.descLate
                  : styles.descOk,
              ],
              doneOrNot,
            ]}>
            {props.desc}
          </Text>
          <Text
            style={[
              moment(new Date(awaitTask)).format('DD') >
              moment(new Date(props.estimateAt)).format('DD')
                ? styles.dateLate
                : styles.dateOk,
            ]}>
            {date(props.doneAt, props.estimateAt)}
          </Text>
        </View>
      </View>
    </Swipeable>
  );
};

const date = (doneAt, estimateAt) => {
  if (doneAt != null) {
    return moment(doneAt)
      .locale('pt-br')
      .format('[Concluído em] ddd, D [de] MMMM.');
  } else {
    return moment(estimateAt).locale('pt-br').format('ddd, D [de] MMMM.');
  }
};

function getCheckView(doneAt) {
  if (doneAt != null) {
    return (
      <View style={styles.done}>
        <Icon name="check" size={15} color={'#FFF'} />
      </View>
    );
  } else {
    return <View style={styles.pending}></View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderColor: '#AAA',
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#FFF',
  },

  checkContainer: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  pending: {
    height: 25,
    width: 25,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#555',
  },

  done: {
    height: 25,
    width: 25,
    borderRadius: 13,
    backgroundColor: '#4D7031',
    alignItems: 'center',
    justifyContent: 'center',
  },

  descLate: {
    fontFamily: commonStyles.fontFamily,
    color: '#A00',
    fontSize: 15,
  },

  descOk: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.mainText,
    fontSize: 15,
  },

  dateOk: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.subText,
    fontSize: 12,
  },

  dateLate: {
    fontFamily: commonStyles.fontFamily,
    color: '#A00',
    fontSize: 12,
  },

  right: {
    backgroundColor: '#B13B44',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },

  left: {
    flex: 1,
    backgroundColor: '#B13B44',
    flexDirection: 'row',
    alignItems: 'center',
  },

  excludeIcon: {
    marginLeft: 20,
  },

  excludeText: {
    fontFamily: commonStyles.fontFamily,
    color: '#FFF',
    fontSize: 20,
    margin: 10,
  },
});
