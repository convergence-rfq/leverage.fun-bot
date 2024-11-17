use anchor_lang::prelude::*;
use core::fmt::Display;

#[error_code]
pub enum LeverageFunError {
    #[msg("Expiration must be in the future")]
    ExpirationIsInThePast, // 6000
    #[msg("Underlying amount per contract must be greater than 0")]
    UnderlyingAmountLessThan0, // 6001
    #[msg("Pyth program does not own oracle")]
    AccountMustBeOwnedByPyth, // 6002
    #[msg("Oracle program does not own oracle")]
    AccountMustBeOwnedByOracleProgram, // 6003
    #[msg("Pyth oracle must be a Price account")]
    PythOracleMustBePrice, // 6004
    #[msg("Number overflow")]
    NumberOverflow, // 6005
    #[msg("Amount must be greater than 0")]
    AmountMustBeGreaterThanZero, // 6006
    #[msg("EuroMeta is expired")]
    EuroMetaIsExpired, // 6007
    #[msg("Option Mint does not match EuroMeta")]
    OptionMintDoesNotMatch, // 6008
    #[msg("Writer Mint does not match EuroMeta")]
    WriterMintDoesNotMatch, // 6009
    #[msg("Price at expiration is already set")]
    PriceAtExpirationIsSet, // 6010
    #[msg("Oracle does not match ExpirationData")]
    OracleDoesNotMatch, // 6011
    #[msg("EuroMeta is not expired")]
    EuroMetaNotExpired, // 6012
    #[msg("Price at expiration has not been set")]
    PriceAtExpirationNotSet, // 6013
    #[msg("Unknown OptionType")]
    UnknownOptionType, // 6014
    #[msg("Cannot prune the market while it's still active")]
    CannotPruneActiveMarket, // 6015
    #[msg("ExpirationData address does not match EuroMeta")]
    ExpirationDataDoesNotMatch, // 6016
    #[msg("Calls must use the underlying pool")]
    CallsMustUseUnderlyingPool, // 6017
    #[msg("Puts must use the stable pool")]
    PutsMustUseStablePool, // 6018
    #[msg("Calls must use the underlying as collateral")]
    CallsMustUseUnderlyingAsCollateral, // 6019
    #[msg("Puts must use the stable as collateral")]
    PutsMustUseStableAsCollateral, // 6020
    #[msg("Failed to convert numeric types")]
    NumericTypeConversionError, // 6021
    #[msg("Decimal conversion error")]
    DecimalConversionError, // 6022
    #[msg("Pyth oracle must have negative expo")]
    PythOrcaleMustHaveNegativeExpo, // 6023
    #[msg("Pyth Price returned None")]
    PythPriceWasNone, // 6024
    #[msg("Price decimals cannot exceed 15")]
    PriceDecimalsExceeds15, // 6025
    #[msg("Oracle provider ID for EuroMeta does not match ExpirationData")]
    OracleProviderIdDoesNotMatch, // 6026
    #[msg("Set Expiration Price should be called before settling writer or option tokens")]
    SetTimeExpirationTimeDeltaIsLargerThanPresent, // 6027
    #[msg("Option type enum not a valid number")]
    OptionTypeOutOfBounds, // 6028
    #[msg("Collateral pool PDA does not match ")]
    CollateralPoolPDAWrong, // 6029
    #[msg("Strike prices must unique and be sorted in ascending order")]
    StrikePricesUnsorted, // 6030
    #[msg("Length of strike prices is not appropriate according to the option type")]
    StrikePricesLenMismatch, // 6031
    #[msg("The collateral type is not allowed for this option type")]
    OptionAndCollateralTypeMismatch, // 6032
    #[msg("The option type does not match with EuroMeta")]
    OptionTypeMismatch, // 6033
    #[msg("Collateral mint doesn't match either stable or underlying")]
    CollateralMintMismatch, // 6034
    #[msg("Failed to get switchboard on demand price")]
    FailedToGetSwitchboardPrice, // 6035
    #[msg("Queue is empty")]
    QueueEmpty, // 6036
    #[msg("")]
    SomeError, // 6037
}

impl LeverageFunError {
    pub fn error_code(&self) -> u32 {
        (*self).into()
    }
}

#[cfg(test)]
#[test]
fn test_error() {
    let error = LeverageFunError::ExpirationIsInThePast;
    assert_eq!(error.error_code(), 6000);
}

pub trait Contextable {
    /// Add a context string `c` to a Result or Error
    ///
    /// Example: foo().context("calling foo")?;
    fn context(self, c: impl Display) -> Self;

    /// Like `context()`, but evaluate the context string lazily
    ///
    /// Use this if it's expensive to generate, like a format!() call.
    fn with_context<C, F>(self, c: F) -> Self
    where
        C: Display,
        F: FnOnce() -> C;
}

impl Contextable for Error {
    fn context(self, c: impl Display) -> Self {
        match self {
            Error::AnchorError(err) => Error::AnchorError(Box::new(AnchorError {
                error_msg: if err.error_msg.is_empty() {
                    format!("{}", c)
                } else {
                    format!("{}: {}", c, err.error_msg)
                },
                ..*err
            })),
            Error::ProgramError(err) => Error::ProgramError(err),
        }
    }

    fn with_context<C, F>(self, c: F) -> Self
    where
        C: Display,
        F: FnOnce() -> C,
    {
        self.context(c())
    }
}

impl<T> Contextable for Result<T> {
    fn context(self, c: impl Display) -> Self {
        if let Err(err) = self {
            Err(err.context(c))
        } else {
            self
        }
    }

    fn with_context<C, F>(self, c: F) -> Self
    where
        C: Display,
        F: FnOnce() -> C,
    {
        if let Err(err) = self {
            let _a = error!(LeverageFunError::SomeError).context("c");
            Err(err.with_context(c))
        } else {
            self
        }
    }
}

#[macro_export]
macro_rules! error_msg {
    ($($arg:tt)*) => {
        error!(LeverageFunError::SomeError).context(format!($($arg)*))
    };
}
