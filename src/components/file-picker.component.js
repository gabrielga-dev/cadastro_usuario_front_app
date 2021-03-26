import React from "react";
import {View, Text, Alert, Pressable} from "react-native";
import {Avatar, Button} from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import {FlexStyle} from "../style/flex.style";
import {PositionStyle} from "../style/position.style";
import {PaddingStyle} from "../style/padding.style";
import {AlertFunction} from "./functions/alert-function.component";
import {AlertOption} from "../model/alert-option.model";

export const FilePicker = ({value, onChange}) => {
    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("É necessário a fornecer a permissão para acessar a camera!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync({base64: true});

        if (pickerResult.cancelled === true) {
            return;
        }
        onChange(pickerResult);
    }

    return(
        <View>
            <Button icon={(value) ? 'close' : 'camera'} mode="contained" onPress={() => openImagePickerAsync()}>
                Selecionar arquivo de foto
            </Button>
            {
                value &&
                (
                    <View style={[FlexStyle.makeFlex(1), PositionStyle.centralizadoXY, PaddingStyle.makePadding(0,10)]}>
                        <Pressable onLongPress={() => AlertFunction(
                            'Atenção', 'Você deseja remover esta imagem?',
                            [
                                new AlertOption('Não'),
                                new AlertOption('Sim', () => onChange(undefined)),
                            ]
                        )}>
                        <Avatar.Image
                            source={{uri: value.uri}}
                            size={150}
                        />
                        </Pressable>
                    </View>
                )
            }
        </View>
    );
}