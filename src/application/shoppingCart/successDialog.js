import React from 'react'

const successDialog=(props)=>{
    console.log('open success',props.open)
    return(
        <>
        <Dialog
        onClose={props.handleClose}
        open={props.open}
      >
        <DialogContent>
          <Grid style={{ color: 'green' }}>
            You have successfully placed your order
                   </Grid>
        </DialogContent>
      </Dialog>
      </>
    )
}
export default successDialog