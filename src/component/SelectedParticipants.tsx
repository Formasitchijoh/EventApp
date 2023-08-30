import React from 'react';
import { User } from '../Models/userType';
import { UserCmponent } from './SearchInput';
import { Text, TouchableOpacity, View } from 'react-native';
import { CustomButton } from './SearchInput';
type Props = {
  displayParticipant: boolean;
  participants: User[];
  onSubmitParticipants: () => void
};

export const SelectedParticipants: React.FC<Props> = ({ displayParticipant, participants,onSubmitParticipants }) => {
  return (
    <View>
      {displayParticipant &&
        participants.map((data, index) => (
          <UserCmponent
            id={data.id}
            name={data.name}
            email={data.email}
            photoUrl={data.photoUrl}
            key={index}
            Selected={data.Selected} 
          />
        ))}
         <View style={{width:'100%', height:'50%', alignItems:'flex-end', justifyContent:'flex-end'}}>
         <CustomButton width={40} title="Add" onAddUser={onSubmitParticipants} />
         </View>
    </View>
  );
};