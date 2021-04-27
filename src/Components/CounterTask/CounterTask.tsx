import { Button, Card, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import './CounterTask.css'

const CounterTask = () => {

    const [count, setCount] = useState(0);

    return (
        <div className={"rootCounter"}>
            <Card className={"cardCustom"}>
                <Typography variant={"h5"}>Counter Value : {count}</Typography>
                <div style={{marginTop:'15px'}}>
                    <Button
                        variant={"outlined"}
                        onClick={() => setCount(count+1)}
                        color={"primary"}
                        style={{marginRight:'15px'}}>Add 1</Button>
                    <Button
                        variant={"outlined"}
                        onClick={() => setCount(0)}
                        color={"secondary"}>Reset</Button>
                </div>
            </Card>
        </div>
    )
}

export default CounterTask
