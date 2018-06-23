import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Rating } from 'react-native-elements';
import styled from 'styled-components/native';
import { Professor } from './match.page';

interface ProfessorCellProps extends Professor {
  onTap: (UserName: string, UserId: number, Distance: number) => void;
}

export function ProfessorCell(props: ProfessorCellProps) {
  const handleTap = () => props.onTap(props.UserName, props.UserId, props.Distance);
  return(
    <View
      style={{flex: 1, padding: 20, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center'}}
    >
      <View style={{flex: 4}}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', marginBottom: 4}}>
          <Text style={{fontSize: 20, color: 'black'}}>
            {props.UserName}
          </Text>
          <Rating
            readonly={true}
            startingValue={props.Rating / 5}
            onFinishRating={() => null}
            imageSize={20}
            ratingCount={1}
            style={{paddingLeft: 10, paddingRight: 5}}
          />
          <Text>({props.Rating})</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row', marginBottom: 4}}>
          <View>
            <TextLabel>
              {'Endereço: '}
            </TextLabel>
          </View>
          <View style={{flex: 1}}>
            <TextValue>
              {props.Address}
            </TextValue>
          </View>
        </View>
        <View style={{flex: 1, flexDirection: 'row', marginBottom: 4}}>
          <View>
            <TextLabel>
              {'Distância: '}
            </TextLabel>
          </View>
          <View style={{flex: 1}}>

            <TextValue>
              {props.Distance + 'km'}
            </TextValue>
          </View>
        </View>
      </View>
      <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 30, color: 'green', marginBottom: 4}}>R$ {props.Price}</Text>
        <TouchableOpacity
          onPress={handleTap}
          style={{backgroundColor: '#006A82', width: '100%', height: 35, elevation: 4, borderRadius: 10, alignItems: 'center', justifyContent: 'center', padding: 4}}
        >
          <Text style={{color: 'white', fontWeight: 'bold'}}>{'Match!'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export const TextLabel = styled.Text`
  font-size: 16;
`;

export const TextValue = styled.Text`
  font-size: 16;
  color: black;
`;

export const Divider = styled.View`
  height: 2;
  align-self: stretch;
  background-color: lightgray;
`;
