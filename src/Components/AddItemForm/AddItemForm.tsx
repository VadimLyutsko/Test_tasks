import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from '@material-ui/core';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = ({addItem}) => {
    const [title, setTitle] = useState<string>('');

    const onChangeSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };
    const onEnterDownAddItem = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addNewItem();

    const addNewItem = () => {
        const trimmedTitle = title.trim();
        if (trimmedTitle !== '') {
            addItem(trimmedTitle);
        }
        setTitle('');
    };


    return (
        <div>
            <TextField
                style={{display: 'flex', width: '90%'}}
                label={' Write new task here'}
                value={title}
                onChange={onChangeSetLocalTitle}
                onKeyDown={onEnterDownAddItem}
                placeholder="Touch me :)"
            />
        </div>
    );
};

